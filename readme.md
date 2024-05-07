# Közösségi Konyha

A Közösségi Konyha egy webalkalmazás, amely lehetővé teszi a felhasználóknak receptek böngészését és megosztását.

## Funkciók

- **Receptek keresése és szűrése:** A felhasználók különböző kategóriák, címek vagy kulcsszavak alapján kereshetnek receptek között. Lehetőség van szűrésre típus, elkészítési idő stb. alapján.
  
- **Regisztráció és bejelentkezés:** Felhasználók regisztrálhatnak és bejelentkezhetnek a saját fiókjukhoz való hozzáférés érdekében.
  
- **Receptek hozzáadása:** Regisztrált felhasználók saját recepteket adhatnak hozzá az alkalmazáshoz. A hozzáadott receptek tartalmazhatnak címet, leírást, hozzávalókat, elkészítési utasításokat és képet.

## Felhasznált eszközök

Az alkalmazás frontenden React-ben, backenden pedig Express.js-ben készült. Mindkettő komponens TypeScripttel lett írva.

## Útmutató

1. **Node.js és Node Package Manager (npm) telepítése:**
   - Töltsd le és telepítsd a [Node.js-t](https://nodejs.org/).
   
2. **Függőségek telepítése:**
   - Mind a backend, mind a frontend mappában futtasd a `npm install` parancsot a függőségek telepítéséhez.

3. **Frontend elindítása:**
   - A frontend mappában futtasd a `npm run dev` parancsot a fejlesztői szerver indításához.

4. **Backend elindítása:**
   - A backend mappában futtasd a `node ./dist/app.js` parancsot a szerver indításához.

5. **Adatbázis ellenőrzése:**
   - Győződj meg róla, hogy az adatbázis beállításai megfelelőek a `.env` fájlban.

## Tesztelés

A backend tesztelése Postman segítségével történt.

## Megjegyzés

- Az adatbázis exportja a fájlok közt található, típusa mysql
- A backend a 5000-es porton fut, a frontend pedig a 5173-as porton.
- Az alkalmazást Karai Kornél Péter, Szimet Soma Sándor és Oláh-Kapecska Judit készítette a 2024-es szoftverfejlesztő és tesztelő szakmai vizsgára.
