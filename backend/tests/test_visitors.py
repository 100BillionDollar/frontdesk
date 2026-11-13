from fastapi.testclient import TestClient


def test_health(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_visitor(client: TestClient) -> None:
    response = client.post(
        "/visitors",
        json={"name": "Asha", "phone": "9999999999", "purpose": "Checkup"},
    )
    assert response.status_code == 201
    body = response.json()
    assert body["id"] == 1
    assert body["name"] == "Asha"
    assert body["phone"] == "9999999999"
    assert body["purpose"] == "Checkup"
    assert body["checked_in_at"] is not None
    assert body["checked_out_at"] is None


def test_create_visitor_requires_name(client: TestClient) -> None:
    response = client.post("/visitors", json={"phone": "9999999999"})
    assert response.status_code == 422


def test_list_visitors_newest_first(client: TestClient) -> None:
    client.post("/visitors", json={"name": "Pehla"})
    client.post("/visitors", json={"name": "Doosra"})

    response = client.get("/visitors")
    assert response.status_code == 200
    names = [v["name"] for v in response.json()]
    assert names == ["Doosra", "Pehla"]


def test_list_visitors_empty(client: TestClient) -> None:
    response = client.get("/visitors")
    assert response.status_code == 200
    assert response.json() == []
