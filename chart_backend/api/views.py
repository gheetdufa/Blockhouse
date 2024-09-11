from django.http import JsonResponse

def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr"],
        "datasets": [{
            "label": "Sales",
            "data": [10, 20, 30, 40],
            "backgroundColor": "rgba(75,192,192,0.6)"
        }]
    }
    return JsonResponse(data)

def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "datasets": [{
            "label": "Products",
            "data": [100, 150, 200],
            "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    }
    return JsonResponse(data)

def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "datasets": [{
            "data": [300, 50, 100],
            "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    }
    return JsonResponse(data)

def candlestick_data(request):
    data = {
        "data": [
            {"time": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
            {"time": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
            {"time": "2023-01-03", "open": 40, "high": 50, "low": 35, "close": 45},
        ]
    }
    return JsonResponse(data)