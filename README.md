![11111](https://user-images.githubusercontent.com/26343374/82413547-3856f080-9a7e-11ea-8d1e-5c93e17e305c.png)

# NearContracts
## Revolutionary tool which allows you to write smartcontracts as usual!

This application was designed from scratch especially for NEAR Ready Layer One Hackathon!

Official site: https://nearcontracts.herokuapp.com/

Video presentation: https://youtu.be/kR-ms5b1VxA

Frontend Github: https://github.com/MikaelLazarev/nearcontracts

Backend Github: https://github.com/MikaelLazarev/nearcontracts-server

### Inspiration
Near protocol makes a huge step to simplify interation with blokchain for majorty of people. Simple signup & login flow (without intsalling metamask or writing BIP39 codes on paper) makes Near protocol very promising for real adoption. It's inspired me to use the same approach for writing smartcontracts.

### Problem
Usual contracts are very popular and written in human language but have no automation. Smartcontracts are executed automatically but could not be read only for tech-savvy people. Current economic turmoil could bring default crisis, when partner would no be willing to pay obligations.

This situation makes a deep negative impact for contracts with small sums cause legal services and a lot of issues  could understand them pretty well. However, with current ecomonic turmoil and lack of trust, we need someting better that regular contracts especially to work with foreign partnets.

This behavior puts particular pressure on the contracts for small amounts, for the sake of which they are usually not sued, since legal costs are high and also require a lot of time and effort.

### Solution

NearContacts allows you to write your contracts with human language as usual. Special syntax add an opportunty to add special blocks which are still human readable but add extract smart contract features. It automates all processes, described in smartcontracts and help to track all payment and submission events.

### How it works

1.You choose an usual conract template from Template collection and than press "Create contract".

<img width="1440" alt="1" src="https://user-images.githubusercontent.com/26343374/82379935-6281c180-9a30-11ea-8335-1e384dd2aaee.png">

3. New contract appears in My Contracts, choose it and then press Edit

<img width="1440" alt="5" src="https://user-images.githubusercontent.com/26343374/82379952-67467580-9a30-11ea-9fb7-87657f065922.png">

4. When you want to add a payment milestone, you should use dollar sign as syntax and soecify terms. Interative editor immidiately renders your extra markdown language:

* Name: milestone name
* Description: things to be done during milestone
* Amount: how much Client should pay to supplier

<img width="1161" alt="6" src="https://user-images.githubusercontent.com/26343374/82418739-08abe680-9a86-11ea-8ff8-50a2656e1675.png">

5. To finalize the contract, choose partner from list and save changes. (When you choose a partner, s/he gets an access to contract and could edit it also!)

<img width="1225" alt="7" src="https://user-images.githubusercontent.com/26343374/82424080-59730d80-9a8d-11ea-93ed-da79761c018e.png">

6. When contract is ready you could deploy it to Near Protocol blockchain pressing Deploy button. When you contract is deployed you could no be able to change it in system. 

<img width="1189" alt="8" src="https://user-images.githubusercontent.com/26343374/82427181-6a258280-9a91-11ea-952a-a229828ef688.png">

** YOU COULD ALSO PRINT & SIGN PAPER COPY OF YOU DEPLOYED SMART CONTRACT! **

7. Both sides should digitally sign contract by pressing Sign button which automatically appears after deployment

8. After signng the contract, you could control execution via Milestone tab:

<img width="1171" alt="9" src="https://user-images.githubusercontent.com/26343374/82427593-f9cb3100-9a91-11ea-92e9-69bada4aab67.png">

9. A user with Client Role could "Start milestone" and pay for submitted one. A user with role Supplier could Submit job when its done. When Client press "Pay button", money would be trasferred from his account to Suppliers account automatically.

10. For curent version each user gets 1000 USD on account. You can always check your balance pressing on Account button in top rigth corner:

<img width="272" alt="10" src="https://user-images.githubusercontent.com/26343374/82427862-54648d00-9a92-11ea-8119-1ca41f96e440.png">

### Disclaimer

This application is provided "as is" and "with all faults." Me as developer makes no representations or warranties of any kind concerning the safety, suitability, lack of viruses, inaccuracies, typographical errors, or other harmful components of this software. There are inherent dangers in the use of any software, and you are solely responsible for determining whether this software product is compatible with your equipment and other software installed on your equipment. You are also solely responsible for the protection of your equipment and backup of your data, and THE PROVIDER will not be liable for any damages you may suffer in connection with using, modifying, or distributing this software product.

### Stack:

* Typescript
* React, Bootstrap
* Near Protocol
* Typeorm, Postgres
