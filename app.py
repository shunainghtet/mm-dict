from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load dictionary data from the JSON file
with open("dictionary.json", "r", encoding="utf-8") as file:
    dictionary_data = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    query = request.args.get('query', '').lower()

    # Filter dictionary data for Myanmar-to-English and English-to-Myanmar
    mm_to_eng = [item for item in dictionary_data if item['word'].lower() == query]
    eng_to_mm = [item for item in dictionary_data if item['definition'].lower() == query]

    # Combine results and group by word
    combined_results = {}

    # Group by word and collect all definitions for each word
    for item in mm_to_eng + eng_to_mm:
        word = item['word']
        definition = item['definition']

        # Add definition to the list for this word, if not already added
        if word not in combined_results:
            combined_results[word] = []

        combined_results[word].append(definition)

    # Format the results as a list of dictionaries
    result_list = [{'word': word, 'definitions': defs} for word, defs in combined_results.items()]

    # Return results as JSON
    return jsonify(result_list)

if __name__ == '__main__':
    app.run(debug=True)
