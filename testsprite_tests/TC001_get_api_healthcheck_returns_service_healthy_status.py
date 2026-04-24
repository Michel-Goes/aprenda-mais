import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime

def test_get_api_healthcheck_returns_service_healthy_status():
    base_url = "http://localhost:3002"
    endpoint = "/api/healthcheck"
    url = base_url + endpoint
    auth = HTTPBasicAuth("michelfgoes1998@gmail.com", "Ap#234")
    timeout = 30

    try:
        response = requests.get(url, auth=auth, timeout=timeout)
    except requests.RequestException as e:
        assert False, f"Request to {url} failed with exception: {e}"

    assert response.status_code == 200, f"Expected status 200 but got {response.status_code}"

    try:
        json_data = response.json()
    except ValueError:
        assert False, "Response is not in JSON format"

    assert "status" in json_data, "Response JSON missing 'status'"
    assert "message" in json_data, "Response JSON missing 'message'"
    assert "timestamp" in json_data, "Response JSON missing 'timestamp'"

    assert json_data["status"] == "ok", f"Expected status 'ok' but got {json_data['status']}"
    assert json_data["message"] == "service healthy", f"Expected message 'service healthy' but got {json_data['message']}"

    timestamp_str = json_data["timestamp"]
    try:
        datetime.fromisoformat(timestamp_str)
    except ValueError:
        assert False, f"Timestamp is not a valid ISO format datetime: {timestamp_str}"

test_get_api_healthcheck_returns_service_healthy_status()