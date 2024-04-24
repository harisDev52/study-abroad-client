import csv
import json
from flask import jsonify

def read_program_data_from_csv(file_path):
    try:
        with open(file_path, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            return list(csv_reader)
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{file_path}' not found.")
    except Exception as e:
        raise Exception(f"Error reading CSV file '{file_path}': {e}")

def read_description_from_csv(file_path):
    try:
        with open(file_path, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            return list(csv_reader)
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{file_path}' not found.")
    except Exception as e:
        raise Exception(f"Error reading CSV file '{file_path}': {e}")

def group_programs_by_domain(programs):
    domain_programs = {}
    for program in programs:
        domain = program['domain']
        domain_programs.setdefault(domain, []).append(program)
    return domain_programs

def get_description_by_domain(descriptions, domain):
    for desc in descriptions:
        if desc.get('Domain') == domain:
            return desc.get('Description')
    return 'Description not available'

def read_reviews_from_json(file_path):
    try:
        with open(file_path, mode='r', encoding='utf-8') as json_file:
            reviews_data = json.load(json_file)
            return reviews_data
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{file_path}' not found.")
    except Exception as e:
        raise Exception(f"Error reading JSON file '{file_path}': {e}")

def get_reviews_by_university(reviews, university):
    all_reviews = reviews.get('all', [])
    for item in all_reviews:
        if item.get('university') == university:
            return item.get('reviews', [])
    return []


def init_profile_routes(app):
    programs = read_program_data_from_csv('programs.csv')
    domain_programs = group_programs_by_domain(programs)
    descriptions = read_description_from_csv('data2.csv')
    reviews = read_reviews_from_json('reviews.json')

    @app.route('/programs', methods=['GET'])
    def get_all_programs():
        if programs:
            return jsonify({'universities': programs}), 200
        else:
            return jsonify({'message': 'No programs found'}), 404

    @app.route('/universities/<domain>', methods=['GET'])
    def get_universities_by_domain(domain):
        universities = domain_programs.get(domain, [])
        if universities:
            return jsonify({'universities': universities}), 200
        else:
            return jsonify({'message': 'No universities found for the given domain'}), 404

    @app.route('/description/<domain>', methods=['GET'])
    def get_university_description(domain):
        description = get_description_by_domain(descriptions, domain)
        return jsonify({'description': description}), 200

    @app.route('/reviews/<university>', methods=['GET'])
    def get_reviews_by_university_api(university):
        uni_reviews = get_reviews_by_university(reviews, university)
        return jsonify({'reviews': uni_reviews}), 200

