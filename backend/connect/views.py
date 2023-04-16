import csv
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CsvModel
from .transcript import get_output_tone
# Create your views here.

@csrf_exempt
@api_view(['GET'])
def price_view(request, symbol):
    if request.method == 'GET':
        data = []
        with open('connect/data/' + symbol + '_mvavg.csv') as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                data.append({
                    'date': row[1],
                    'symbol': row[2],
                    'close': row[3],
                    'volume': row[4],
                    'ma50': row[5],
                    'ma200': row[6],
                })
        return Response(data)

@csrf_exempt
@api_view(['GET'])
def transcript_tone_view(request, symbol):
    if request.method == 'GET':
        data = []
        with open('connect/data/refined/AAPL_1.json') as f:
            data = json.load(f)
        return JsonResponse({'data': data})

@csrf_exempt
@api_view(['GET'])
def portfolio_view(request,file):
    if request.method == 'GET':
        data = []
        with open('connect/data/portfolio/' + file + '.csv') as f:
            reader = csv.reader(f)
            if file == 'risk_model_cov' or file == 'cor_mat_normal':
                next(reader)
                for row in reader:
                    data.append({
                        'comp': row[0],
                        'AAPL': row[1],
                        'GOOG': row[2],
                        'JNJ': row[3],
                        'KO': row[4],
                        'MSFT': row[5],
                        'NVDA': row[6],
                        'PG': row[7],
                        'TSLA': row[8],
                    })
            elif file == 'all_companies_price' or file == 'cum_return' or file == 'daily_simple_return':
                next(reader)
                for row in reader:
                    data.append({
                        'date': row[0],
                        'AAPL': row[1],
                        'GOOG': row[2],
                        'JNJ': row[3],
                        'KO': row[4],
                        'MSFT': row[5],
                        'NVDA': row[6],
                        'PG': row[7],
                        'TSLA': row[8],
                    })
            elif file == 'portfolio_pie':
                for row in reader:
                    data.append({'value': row})
            else:
                next(reader)
                for row in reader:
                    data.append({
                        'comp': row[0],
                        'value': row[1]
                    })
        return Response(data)

                


