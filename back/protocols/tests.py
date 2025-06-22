from rest_framework.test import APITestCase
from rest_framework import status

class ProtocolsAPITestCase(APITestCase):
    def test_create_and_get_protocol(self):
        data = {
            "title": "Test Protocol",
            "description": "Test Description",
            "author": "Maëva Rodrigues",
            "icon": "🧪",
            "category": "Stérilisation"
        }

          # POST
        response_post = self.client.post("/api/protocols/", data, format="json")
        self.assertEqual(response_post.status_code, status.HTTP_201_CREATED)
        protocol_id = response_post.data["id"]

        # GET (list)
        response_get = self.client.get("/api/protocols/")
        self.assertEqual(response_get.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response_get.data), 1)
        self.assertEqual(response_get.data[0]["title"], "Test Protocol")

        # GET by ID
        response_get_id = self.client.get(f"/api/protocols/{protocol_id}/")
        self.assertEqual(response_get_id.status_code, status.HTTP_200_OK)
        self.assertEqual(response_get_id.data["id"], protocol_id)

        # PUT (update)
        updated_data = {
            "title": "Updated Protocol",
            "description": "Updated Description",
            "author": "Maëva Rodrigues",
            "icon": "🧫",
            "category": "Collecte"
        }
        response_put = self.client.put(f"/api/protocols/{protocol_id}/", updated_data, format="json")
        self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        self.assertEqual(response_put.data["title"], "Updated Protocol")

        # DELETE
        response_delete = self.client.delete(f"/api/protocols/{protocol_id}/")
        self.assertEqual(response_delete.status_code, status.HTTP_204_NO_CONTENT)

        # Vérifie que le protocole n'existe plus
        response_get_deleted = self.client.get(f"/api/protocols/{protocol_id}/")
        self.assertEqual(response_get_deleted.status_code, status.HTTP_404_NOT_FOUND)