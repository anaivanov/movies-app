# Manager de filme favorite integrat cu TMDB

## Introducere

* Aplicatia este o lista interactiva unde utilizatorul poate adauga si sterge filme pe care vrea sa le vizioneze.
* Aceasta are ca si grup tinta persoane de orice varsta care vor sa managerieze mai usor filmele care ii intereseaza.
* Ca alternativa un utilizator poate folosi o aplicatie de notite, dar nu aceasta nu poate cauta in filmele aparute si nu afiseaza detalii despre film.

## Interfețe aplicație
Cu ajutorul figma.com am creat un mock-up initial care poate fi vizualizat [aici](https://www.figma.com/file/gAUHnUN9Lotf2Kba6eEOYsC9/movies-app?node-id=0%3A1).

Varianta finala a aplicatiei:
![Screenshot 1](https://raw.githubusercontent.com/anaivanov/movies-app/master/screenshots/1.png)

![Screenshot 2](https://raw.githubusercontent.com/anaivanov/movies-app/master/screenshots/2.png)

## API REST

```
GET /createdb - creeaza baza de date
```
```
GET /tmdb/* - face forward tuturor requesturilor catre TMDB, adaugand si tokenul necesar ca parametru.
```
Exemplu:
```
GET /tmdb/3/movie/673
```
Raspuns:
```
{
    "adult": false,
    "backdrop_path": "/wUpBH6RIH4uOiWoPjj8MKUemu9F.jpg",
    "belongs_to_collection": {
        "id": 1241,
        "name": "Harry Potter Collection",
        "poster_path": "/eVPs2Y0LyvTLZn6AP5Z6O2rtiGB.jpg",
        "backdrop_path": "/wfnMt6LGqYHcNyOfsuusw5lX3bL.jpg"
    },
    "budget": 130000000,
    "genres": [
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 10751,
            "name": "Family"
        }
    ],
    "homepage": null,
    "id": 673,
    "imdb_id": "tt0304141",
    "original_language": "en",
    "original_title": "Harry Potter and the Prisoner of Azkaban",
    "overview": "Harry, Ron and Hermione return to Hogwarts for another magic-filled year. Harry comes face to face with danger yet again, this time in the form of escaped convict, Sirius Black—and turns to sympathetic Professor Lupin for help.",
    "popularity": 28.478,
    "poster_path": "/jUFjMoLh8T2CWzHUSjKCojI5SHu.jpg",
    "production_companies": [
        {
            "id": 436,
            "logo_path": "/A7WCkG3F0NFvjGCwUnclpGdIu9E.png",
            "name": "1492 Pictures",
            "origin_country": "US"
        },
        {
            "id": 437,
            "logo_path": "/nu20mtwbEIhUNnQ5NXVhHsNknZj.png",
            "name": "Heyday Films",
            "origin_country": "GB"
        },
        {
            "id": 174,
            "logo_path": "/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png",
            "name": "Warner Bros. Pictures",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "GB",
            "name": "United Kingdom"
        },
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2004-05-31",
    "revenue": 789804554,
    "runtime": 141,
    "spoken_languages": [
        {
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Something wicked this way comes.",
    "title": "Harry Potter and the Prisoner of Azkaban",
    "video": false,
    "vote_average": 7.9,
    "vote_count": 10264
}
```
```
GET /films - returneaza toate filmele stocate in baza de date
```
Exemplu:
```
Raspuns:
[
    {
        "id": 12,
        "tmdbId": "133694",
        "createdAt": "2019-01-05T17:58:56.569Z",
        "updatedAt": "2019-01-05T17:58:56.569Z"
    },
    {
        "id": 17,
        "tmdbId": "438590",
        "createdAt": "2019-01-05T18:33:13.641Z",
        "updatedAt": "2019-01-05T18:33:13.641Z"
    },
    {
        "id": 18,
        "tmdbId": "833",
        "createdAt": "2019-01-05T18:38:13.387Z",
        "updatedAt": "2019-01-05T18:38:13.387Z"
    },
    {
        "id": 19,
        "tmdbId": "374452",
        "createdAt": "2019-01-05T19:49:57.620Z",
        "updatedAt": "2019-01-05T19:49:57.620Z"
    },
    {
        "id": 20,
        "tmdbId": "637",
        "createdAt": "2019-01-06T10:54:49.363Z",
        "updatedAt": "2019-01-06T10:54:49.363Z"
    },
    {
        "id": 21,
        "tmdbId": "381289",
        "createdAt": "2019-01-06T10:56:44.568Z",
        "updatedAt": "2019-01-06T10:56:44.568Z"
    },
    {
        "id": 22,
        "tmdbId": "554731",
        "createdAt": "2019-01-06T10:56:48.484Z",
        "updatedAt": "2019-01-06T10:56:48.484Z"
    },
    {
        "id": 24,
        "tmdbId": "671",
        "createdAt": "2019-01-06T11:31:30.630Z",
        "updatedAt": "2019-01-06T11:31:30.630Z"
    }
]

```

```
POST /film
{
	"tmdbId": {id}
} - adauga un film in baza de date
```
```
Exemplu raspuns:
{
    "id": 25,
    "tmdbId": 33335,
    "updatedAt": "2019-01-06T11:50:14.255Z",
    "createdAt": "2019-01-06T11:50:14.255Z"
}

```
```
DELETE /film/:{id}
Exemplu:
DELETE /film/133694
```

# ATENTIE
Pentru a putea rula partea de backend a aplicatiei este nevoie de un token TMDB care trebuie pus in fisierul .env.
Exemplu:
```
API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
```
