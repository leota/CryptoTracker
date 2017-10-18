# CryptoTracker
<div>
    <p>Simple app to keep track of your criptocurrencies investments.</p>
</div>
<div style="text-align: center;">
    <img src="/img/sample.png" style="display:block;max-width: 200px;"></img>
</div>

## Setup
```
git clone git@github.com:leota/CryptoTracker.git
cd CryptoTracker
npm install
```

## Configuration
On Linux/Mac
```
cp src/_config.ts src/config.ts
```
On Windows
```
copy .\src\_config.ts .\src\config.ts
```

Then insert desired cryptocurrencies to watch and invested amount into newly created `config.ts`


## Run
```
npm start
```

## Build
```
npm run build
```
#### Production build
```
npm run build --production
```