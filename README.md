# Webbtjänst för en pizzeria
En RESTful webbtjänst som hanterar en pizzerias administreringsanvändare, meny och inkommande meddelanden. Webbtjänsten är skapad med Node.js, 
Express, mongoose och JWT. Webbtjänsten stödjer CRUD-operationer i form av Create, Read, Update och Delete via olika endpoints. 
Med hjälp av bcrypt skyddas användares lösenord genom hashning, vilket gör det omöjligt för någon att se det riktiga lösenordet.

## Länk
Publicerat API: [https://projekt-api-73oa.onrender.com](https://projekt-api-73oa.onrender.com)

## API endpoints
### Användare
| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/users               | Hämta alla användare                |
| GET      | /api/users/:id           | Hämta användare med ID              |
| POST     | /api/register            | Registrera ny användare             |
| POST     | /api/login               | Logga in existerande användare      |
| PUT      | /api/users/:id           | Uppdatera befintlig användare       |
| DELETE   | /api/users/:id           | Radera användare med ID             |

### Meny
| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/menu                | Hämta hela menyn/alla rätter        |
| GET      | /api/menu/:id            | Hämta rätt med ID                   |
| POST     | /api/menu                | Lägga till ny rätt                  |
| PUT      | /api/menu/:id            | Uppdatera befintlig rätt med ID     |
| DELETE   | /api/menu/:id            | Radera rätt med ID                  |

### Meddelanden
| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/messages            | Hämta alla meddelanden              |
| GET      | /api/messages/:id        | Hämta meddelande med ID             |
| POST     | /api/messages            | Skapa nytt meddelande               |
| PUT      | /api/messages/:id        | Uppdatera befintligt meddelande     |
| DELETE   | /api/messages/:id        | Radera meddelande med ID            |

**Objekt returneras/skickas som JSON**    
Exempel: GET `/api/menu/:id`     
id = 68add02b1b844cd7eb5c5681:
```json
{
  "_id": "68add02b1b844cd7eb5c5681",
  "name": "Gondola",
  "category": "Pizza klass 2",
  "ingredients": "Tomatsås, Ost, Skinka, Räkor",
  "price": 120,
  "createdAt": "2025-08-26T15:18:03.848Z",
  "__v": 0
}
```

## Verktyg
- Node.js
- Express
- Mongoose
- MongoDB Atlas
- dotenv
- bcrypt
- JWT
- cors

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/projekt-api.git
cd projekt-api
```

2. **Installera paket:**
```bash
npm install
```

3. **Skapa `.env`-fil och fyll i databasuppgifter:**
```env
PORT=3000
DATABASE= "--hämtad från MongoDB Atlas--"
JWT-SECRET-KEY="--skapa hemlig JWT-nyckel"
```

4. **Starta server:**

```bash
npm run start
```

5. API länk: [http://localhost:3000/api](http://localhost:3000/api) 

### Validering
- Alla fält ifyllda vid skapande och uppdatering
- Webbtjänsten returnerar tydliga felmeddelanden och statuskoder vid saknade fält eller andra fel så som:
```json
{
  "error": "Username and password are required"
}
```

eller:

```json
{
  "message": "Menu validation failed: category: Fyll i innehåll"
}
```

## Testning
API:t kan testas med program som:
- Thunder Client (vsc extension)
- Postman
- Advanced REST Client

## Användning i frontend
API:t kan kopplas till två frontendapplikationer. Ena för att administrera pizzerians meny och motta meddelanden från kunden, 
andra är till för pizzerians kunder som kan se menyn och skicka in meddelanden i ett kontaktformulär.     
Repo till admin-applikation: 
```bash
git clone https://github.com/rare2400/projekt-admin.git
```

Repo till kund-applikation: 
```bash
git clone https://github.com/rare2400/projekt-pizzeria.git
```

## Skapad av
Skapad som en del av en projektuppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
[rare2400@student.miun.se](mailto:rare2400@student.miun.se)      
2025-10-19
