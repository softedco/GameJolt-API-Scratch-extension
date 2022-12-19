# Documentation for the GameJolt API Scratch extension
## 1. Installation
### 1.1 Setup
Paste the following link into the custom extensions box.

![image](https://user-images.githubusercontent.com/100989385/205424519-fc7d0aa9-e9ec-418a-8dee-eb042f733a15.png)
### 1.2 Packaging
Paste the same link into the custom extensions box in the packager.

![image](https://user-images.githubusercontent.com/100989385/205424671-a44604f1-1625-40b4-a41d-113a8f4e33b7.png)
## 2. Blocks
### 2.1 GameJolt boolean block
![image](https://user-images.githubusercontent.com/100989385/205424875-8b472cce-244e-4397-9dc9-e7683b2f8e60.png)

This block is needed to check whether your project is run on GameJolt or not.
### 2.2 Session blocks
Most of the following blocks will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)
#### 2.2.1 Set game ID and key command block
![image](https://user-images.githubusercontent.com/100989385/205425100-9e713a21-7791-4620-ac12-e637114e27e0.png)

This block is needed to set the ID and the private key of your game for the API to recognize your requests.

Important note: Do NOT share any downloadable versions of your project with the private key stored in them, posting your game on GameJolt as a web playable version is the only safe way to do it.
#### 2.2.2 Open/Close session command block
![image](https://user-images.githubusercontent.com/100989385/205425285-ad544b69-63af-4043-8739-f84b3a099427.png)

This block is needed to open or close the game session for the API to recognize whether the user is playing the game or not.
#### 2.2.3 Ping session command block
![image](https://user-images.githubusercontent.com/100989385/205425648-d53b0669-97e2-479e-84d5-c911f2231d7c.png)

This block is needed to ping the session to maintain the connection with the API server.

This block is not necessary because the extension pings the session for you.
#### 2.2.4 Session boolean block
![image](https://user-images.githubusercontent.com/100989385/205425760-9e838b34-a3be-47f3-9160-bbd74367d567.png)

This block is needed to check whether the current game session is active or not.
### 2.3 Login blocks
The following blocks will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)

Some of the following blocks will not work unless the user is logged in. [see 2.3.1](#231-login-with-username-and-token-command-block)
#### 2.3.1 Login with username and token command block
![image](https://user-images.githubusercontent.com/100989385/205426265-4e74f780-6a37-4ec7-ba15-5b5cd29e1e6e.png)

This block is needed to manually login to your GameJolt profile for the API to recognize user related requests.

This block is not necessary because the extension automatically logins you when the game is played on GameJolt. It can be used to manually login in the editor.
#### 2.3.2 Login automatically command block
![image](https://user-images.githubusercontent.com/100989385/205426661-ac593f6a-4dce-4bef-8f79-ee99fce780a7.png)

This block is needed to automatically login to your GameJolt profile for the API to recognize user related requests.

This block is not necessary because the extension automatically logins you when the game is played on GameJolt.
#### 2.3.3 Autologin boolean block
![image](https://user-images.githubusercontent.com/100989385/205426747-0a64b7c3-f7aa-4e8c-9c35-56ea5bff010c.png)

This block is needed to check whether the automatic login function is available and the API recognized the user when the game is played on GameJolt.
#### 2.3.4 Logout command block
![image](https://user-images.githubusercontent.com/100989385/205426894-5de76b49-8227-4609-9855-e07c20fb9c04.png)

This block is needed to logout out of your GameJolt profile.
#### 2.3.5 Login boolean block
![image](https://user-images.githubusercontent.com/100989385/205426930-eb405e24-f41f-4ff4-b3c0-e97ebfad3563.png)

This block is needed to check whether the user is logged in to their GameJolt profile or not.
#### 2.3.6 User logged in as reporter block
![image](https://user-images.githubusercontent.com/100989385/205426997-6841798a-cff6-474a-91fb-5c72bb8b7573.png)

This block is needed to check the username of a logged in user profile.
#### 2.3.7 Fetch user by username/ID command block
![image](https://user-images.githubusercontent.com/100989385/205429189-30018828-b0c9-4bf6-ab42-d9cdf15f43e1.png)

This block is needed to fetch user profile data by user's username or ID.
#### 2.3.8 Fetch logged in user command block
![image](https://user-images.githubusercontent.com/100989385/205429655-fd90b35e-44c0-4dc7-b0ac-391d3e0306d0.png)

This block is needed to fetch logged in user profile data.
#### 2.3.9 Return fetched user's data reporter block
![image](https://user-images.githubusercontent.com/100989385/205429712-a966cb68-4a7e-405e-9230-94586dd34c21.png)

This block is needed to access previously fetched user profile data.
#### 2.3.10 Return user's friend ID by index reporter block
![image](https://user-images.githubusercontent.com/100989385/205429909-7a0e0757-37aa-4dda-9ea2-a0bc7ce6e464.png)

This block is needed to access logged in user's friend IDs by index.
### 2.4 Trophy blocks
The following blocks will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)

The following blocks will not work unless the user is logged in. [see 2.3.1](#231-login-with-username-and-token-command-block)
#### 2.4.1 Achieve trophy command block
![image](https://user-images.githubusercontent.com/100989385/205430114-647594d3-be7c-49a9-b66c-b7d1ec8ff547.png)

This block is needed to give logged in users a trophy by its ID. If the trophy is not secret, it will appear at their user profile.
#### 2.4.2 Remove trophy command block
![image](https://user-images.githubusercontent.com/100989385/205430328-7ca2ba29-1db8-44ab-9943-aca92ee54e1b.png)

This block is needed to remove a trophy from logged in user profiles by its ID.
#### 2.4.3 Fetch trophy data reporter block
![image](https://user-images.githubusercontent.com/100989385/205430452-72f68a1a-b86a-44ba-a527-f698d043a01a.png)

This block is needed to access individual trophy data by it's index or ID.
### 2.5 Score blocks
The following blocks will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)

Some of the following blocks will not work unless the user is logged in. [see 2.3.1](#231-login-with-username-and-token-command-block)
#### 2.5.1 Add score command block
![image](https://user-images.githubusercontent.com/100989385/205431532-ba800c81-0135-4275-ada3-f493994c6cf7.png)

This block is needed to add user scores to your game by table ID (0 is primary table ID).
#### 2.5.2 Add score as guest command block
![image](https://user-images.githubusercontent.com/100989385/205431774-3704e53b-5677-49ab-a741-e4b0d88d6722.png)

This block is needed to add guest scores to your game by table ID (0 is primary table ID).
#### 2.5.3 Fetch global/user scores command block
![image](https://user-images.githubusercontent.com/100989385/205431960-918056f1-4f90-48de-bb5c-78c63781e7af.png)

This block is needed to fetch global or user scores of your game by table ID (0 is primary table ID) that are better or worse than a passed value (setting it to 0 will fetch all scores).
You can also specify the limit to the amount of scores you want to fetch (maximum limit is 100).
#### 2.5.4 Fetch guest scores command block
![image](https://user-images.githubusercontent.com/100989385/205432203-73d5e9f9-73da-4e3d-8db8-8adc73682495.png)

This block is needed to fetch guest scores of your game by table ID (0 is primary table ID) that are better or worse than a passed value (setting it to 0 will fetch all scores).
You can also specify the limit to the amount of scores you want to fetch (maximum limit is 100).
#### 2.5.5 Return fetched score data reporter block
![image](https://user-images.githubusercontent.com/100989385/205432306-47194087-e899-4e4c-80b5-a563d9422971.png)

This block is needed to access previously fetched score data by index.
#### 2.5.6 Return rank of value reporter block
![image](https://user-images.githubusercontent.com/100989385/205432366-c01a9f40-8f99-420c-a1b2-0e0604bdc1a5.png)

This block is needed to check the rank of a passed value in a score table by table ID (0 is primary table ID).
#### 2.5.7 Return table data reporter block
![image](https://user-images.githubusercontent.com/100989385/208526865-886970e3-7aa5-4fac-8b55-471da13aca5e.png)

This block is needed to access individual table data by index.
### 2.6 Data storage blocks
The following blocks will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)

Some of the following blocks will not work unless the user is logged in. [see 2.3.1](#231-login-with-username-and-token-command-block)
#### 2.6.1 Set data command block
![image](https://user-images.githubusercontent.com/100989385/205446090-114d9042-0504-4c41-9dfe-c5a9ce99b093.png)

This block is needed to set global/user keys with data (if the passed key doesn't yet exist in the storage, a new item with that key and data will be created).
#### 2.6.2 Fetch data reporter block
![image](https://user-images.githubusercontent.com/100989385/205446844-40b61055-b135-495f-a810-42007e3a42e9.png)

This block is needed to access fetched global/user data by key.
#### 2.6.3 Update data reporter block
![image](https://user-images.githubusercontent.com/100989385/205446893-a270aedc-ce18-4a8b-b628-3bc94fda442f.png)

This block is needed to update global/user data with a passed value.
#### 2.6.4 Remove data command block
![image](https://user-images.githubusercontent.com/100989385/205446941-873d1d35-68fc-4ce3-b4a3-661b34a1566c.png)

This block is needed to remove global/user data by key.
#### 2.6.5 Fetch keys reporter block
![image](https://user-images.githubusercontent.com/100989385/205447058-830e0c6a-6a60-40fd-97e7-14a4e4c614bc.png)

This block is needed to access fetched keys that are following the passed pattern value by index, the placeholder character for patterns is \*
### 2.7 Return server time command block
The following block will not work unless you set the game ID and the private game key. [see 2.2.1](#221-set-game-id-and-key-command-block)

![image](https://user-images.githubusercontent.com/100989385/205447230-7d3ccaf7-4e34-49c5-ab24-b2aff7719860.png)

This block is needed to access server's current time
## 3. Error descriptions
Work in progress
## 4. Examples
Work in progress
