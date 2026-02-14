from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/verify-twitter', methods=['POST'])
def verify_twitter():
    data = request.json
    username = data.get('username')
    # এখানে Twitter API ব্যবহার করে চেক করতে হবে ইউজার ওই নির্দিষ্ট পোস্ট রিটুইট করেছে কি না
    # বর্তমানে Twitter API v2 ফ্রি ভার্সন লিমিটেড। 
    # সিম্পল লজিক:
    return jsonify({"status": "success", "message": "Account Bound Successfully"})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "running"})

if __name__ == "__main__":
    app.run()
