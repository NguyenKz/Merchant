# Merchant List

This is a simple web application to manage a list of merchants. It allows you to perform CRUD (Create, Read, Update, Delete) operations on merchant records.

### Technologies Used

- HTML
- CSS (Bootstrap)
- JavaScript (jQuery)
- Django (Backend)
- Django Rest Framework
- SQLite (Database)
- Docker, Docker-compose (optional)
### Prerequisites

- Python (3.10 or higher)
- Django (5.0.2)
- Django Rest Framework (3.14.0)
- psycopg2 (2.9.1 or higher)

### Installation

#### Docker:
1. Dokcer with Postgres
    ```bash
    docker-compose -f docker-compose-postgres.yml up --build 
    ```
2. Dokcer with SQLIite
    ```bash
    docker-compose -f docker-compose-sqlite.yml up --build   
    ```

#### Non Docker
1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/merchant-list.git
    ```

2. Navigate to the project directory:

    ```bash
    cd merchant-list
    ```

3. Create a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

    - On macOS and Linux:

        ```bash
        source venv/bin/activate
        ```

5. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

6. Apply migrations:

    ```bash
    python manage.py migrate
    ```

7. Load static files:

    ```bash
    python manage.py collectstatic
    ```

8. Run the development server:

    ```bash
    python manage.py runserver
    ```

9. Open a web browser and go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the application.

### Database

This project uses SQLite as the default database. The SQLite database file is created automatically during the migration process.

### TODO

- [ ] **Switch to PostgreSQL:** Consider migrating to PostgreSQL for production use.
  

### Usage

1. Open `merchants_list.html` in a web browser from [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
    - Get list merchants.
    - Create, edit, or delete merchants as needed.

### Endpoints

#### List and Create Merchants

- Endpoint: `merchant/api/`
- Method: 
    - `GET` (List)
        - Response Example:
        ```json
        [
            {
                "id": 5,
                "created_at": "2024-02-29 15:21",
                "updated_at": "2024-03-01 02:18",
                "name": "Trần Thảo Nguyên",
                "description": "tran thao nguyen",
                "description_html": "haha",
                "email": "yeu.mobi@gmail.com",
                "phone_number": "+14324242424"
            },
            {
                "id": 7,
                "created_at": "2024-02-29 17:21",
                "updated_at": "2024-02-29 17:21",
                "name": "Trần Thảo Nguyên",
                "description": "tran thao nguyen",
                "description_html": "haha",
                "email": "yeu.obi@gmail.com",
                "phone_number": "+14324242427"
            },
            {
                "id": 8,
                "created_at": "2024-03-01 02:19",
                "updated_at": "2024-03-01 02:20",
                "name": "Trần Thảo Nguyên",
                "description": "",
                "description_html": "",
                "email": "ttnguyenkz@gmail.com",
                "phone_number": "+84234567890"
            }
        ]
        ```
    - `POST` (Create)
        - Body:
        ```json
            {
               "name": "new name",
               "description":"new description",
               "description_html":"new description_html",
               "email":"new email",
               "phone_number":"new phone_number",
            }
        ```

#### Retrieve, Update, and Destroy Merchant

- Endpoint: `merchant/api/<int:pk>/`
- Method: 
    - `GET` (Retrieve)
        - Response Example:
        ```json
        {
            "id": 5,
            "created_at": "2024-02-29 15:21",
            "updated_at": "2024-03-01 02:18",
            "name": "Trần Thảo Nguyên",
            "description": "tran thao nguyen",
            "description_html": "haha",
            "email": "yeu.mobi@gmail.com",
            "phone_number": "+14324242424"
        }
        ```
    - `PATCH` (Update)
        - Body: 
            ```json
            {
               "name": "new name",
               "description":"new description",
               "description_html":"new description_html",
               "email":"new email",
               "phone_number":"new phone_number",
            }
            ```
    - `DELETE` (Destroy)

#### Render Merchant List Page

- Endpoint: `/`
- Method: `GET`

### Contributing

Contributions are welcome! If you find any issues or have improvements, feel free to create a pull request.

### License

This project is licensed under the [MIT License](LICENSE).
