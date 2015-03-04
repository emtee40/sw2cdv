# sw2cdv

To install:

```
git clone https://github.com/MobileChromeApps/sw2cdv.git
cd sw2cdv
npm install
# npm link # Optional
./dev-bin/git-up.js
```

To try it:

```
cd tests/gulp
npm install
ln -sf ../MwoghirenServiceWorkerSample/ app # Or any other SW app
gulp clean
gulp buildios
gulp runios
```
