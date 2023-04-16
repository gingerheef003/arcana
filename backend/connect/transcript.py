import nltk
import json
import requests
import asyncio

nltk.download('punkt')

# Read the JSON file
data = None
content = None
sentences = None

async def initialize(sym,quart):
    with open('connect/data/FMP/'+ sym + '/2022/2022_'+ str(quart) + '.json', 'r') as file:
        data = json.load(file)
    content = data['content']
    sentences = await nltk.sent_tokenize(content)

async def get_output_tone(sym):
    return_data = []
    for i in range(1,5):
        initialize(sym,i)
        API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
        headers = {"Authorization": f"Bearer {'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'}"}

        async def query(payload):
            response = await requests.post(API_URL, headers=headers, json=payload)
            return response.json()

        output_tone = await query(sentences)

        max_score = -1
        filtered_output_tone = []

        for sublist in output_tone:
            for dictionary in sublist:
                print(dictionary)
                if dictionary['score'] > max_score:
                    max_score = dictionary['score']
            
            filtered_output_tone.append([d for d in sublist if d['score'] == max_score])
            max_score = -1

        print(filtered_output_tone)

        pos = 0
        neg = 0
        neut = 0
        pos_state = []
        neg_state = []
        neut_state = []

        for i,val in enumerate(filtered_output_tone):
          if(val[0]['label'] == 'positive'):
            pos = pos + 1
            pos_state.append(sentences[i])
          elif(val[0]['label'] == 'negative'):
            neg = neg + 1
            neg_state.append(sentences[i])
          else:
            neut = neut + 1
            neut_state.append(sentences[i])

        return_data.append((pos_state,neut_state,neg_state))
    return return_data


def get_fls_stmts(sym):
    return_data = []
    for i in range(1,5):
        initialize(sym,i)
        API_URL = "https://api-inference.huggingface.co/models/yiyanghkust/finbert-fls"
        headers = {"Authorization": "Bearer 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"}

        def query(payload):
            response = requests.post(API_URL, headers=headers, json=payload)
            return response.json()
            
        output_fls = query(sentences)

        max_score = -1
        filtered_output_fls = []

        for sublist in output_fls:
            for dictionary in sublist:
                if dictionary['score'] > max_score:
                    max_score = dictionary['score']
            
            filtered_output_fls.append([d for d in sublist if d['score'] == max_score])
            max_score = -1

        print(filtered_output_fls)

        FLS = 0 
        FLSNot = 0
        fls_statements = []
        Notfls_statements = []

        for i,val in enumerate(filtered_output_fls):
          if(val[0]['label'] == 'Specific FLS'):
            FLS = FLS+1
            fls_statements.append(sentences[i])
          elif(val[0]['label'] == 'Not FLS'):
            FLSNot = FLSNot +1
            Notfls_statements.append(sentences[i])
        
        return_data.append((fls_statements, Notfls_statements))
    return return_data

def get_esg_stmts(sym):
    return_data = []
    for i in range(1,5):
        initialize(sym,i)
        API_URL = "https://api-inference.huggingface.co/models/yiyanghkust/finbert-esg"
        headers = {"Authorization": "Bearer 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"}

        def query(payload):
            response = requests.post(API_URL, headers=headers, json=payload)
            return response.json()
            
        output_esg = query(sentences)

        max_score = -1
        filtered_output_esg = []

        for sublist in output_esg:
            for dictionary in sublist:
                if dictionary['score'] > max_score:
                    max_score = dictionary['score']
            
            filtered_output_esg.append([d for d in sublist if d['score'] == max_score])
            max_score = -1

        print(filtered_output_esg)

        env = 0
        soc = 0
        gov = 0
        esg_none = 0
        environment_stmts = []
        social_stmts = []
        gov_stmts = []

        for i,val in enumerate(filtered_output_esg):
          if(val[0]['label'] == 'Environment'):
            env = env+1
            environment_stmts.append(sentences[i])
          elif(val[0]['label'] == 'Social'):
            soc = soc +1
            social_stmts.append(sentences[i])
          elif(val[0]['label'] == 'Governance'):
            gov = gov + 1 
            gov_stmts.append(sentences[i])

        return_data.append((environment_stmts,social_stmts,gov_stmts))
    return return_data
