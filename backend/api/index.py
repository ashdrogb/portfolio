from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not all([name, email, message]):
        return jsonify({'error': 'All fields are required.'}), 400

    # In production, configure SMTP env vars and uncomment below
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    msg = MIMEText(f"From: {name} <{email}>\n\n{message}")
    msg['Subject'] = f"Portfolio contact: {name}"
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)

    print(f"[CONTACT] {name} ({email}): {message}")
    return jsonify({'success': True, 'message': 'Message received!'}), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
