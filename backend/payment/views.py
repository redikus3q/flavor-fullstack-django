from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
import json
import os
import stripe

stripe.api_key = settings.STRIPE_TEST_PRIVATE_KEY

DOMAIN = "http://localhost:4200/"


@csrf_exempt
def checkout(request):
    data = json.loads(request.body)
    cart = data['cart']
    print(cart)

    items = []
    for flavor in cart:
        items += {
            'price_data': {
                'currency': 'ron',
                # Price initially in decimal
                'unit_amount': flavor['flavor']['price'] * 100,
                "tax_behavior": "inclusive",
                'product_data': {
                    'name': flavor['flavor']['name'],
                    'images': [flavor['flavor']['imageLink']],
                    'description': flavor['flavor']['description'],
                },
            },
            'quantity': flavor['quantity'],
        },

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=items,
            mode='payment',
            success_url=os.path.join(DOMAIN, 'flavors'),
            cancel_url=os.path.join(DOMAIN, 'flavors'),
            automatic_tax={'enabled': True},
        )
    except Exception as e:
        return str(e)

    return JsonResponse(checkout_session.url, safe=False)


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    event = None

    try:
        event = stripe.Event.construct_from(json.loads(payload),
                                            stripe.api_key)
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        print('PaymentIntent was successful!')
    elif event.type == 'payment_method.attached':
        payment_method = event.data.object  # contains a stripe.PaymentMethod
        print('PaymentMethod was attached to a Customer!')
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event.type))

    return HttpResponse(status=200)
