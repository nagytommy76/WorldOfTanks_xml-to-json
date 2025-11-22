# World of Tanks XML -> JSON converter

![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

### Get the World of Tanks XML files from the game's folder

-  use **7-Zip** file manager: [Download 7-Zip](https://www.7-zip.org)
-  Open **Your_Game_Located\World_of_Tanks_EU\res\packages\scripts.pkg\scripts\item_defs\vehicles\-**
-  Extract your project's XML folder
-  Use [StranikS GitHub repo](https://github.com/StranikS-Scan/WorldOfTanks-Decompiled/tree/2.0_EU)
-  [PjOrion](https://koreanrandom.com/forum/topic/15280-) To decompile the XML files. **Follow the description below**
-  Check for subfolders (components) if it compiles sucessfully.

---

### App usage

-  **Copy** or **clone** this repository
-  Use **NPM** to install all the dependencies
-  Use **npm run start** command to run the app

---

## PjOrion description:

How to decompile and unpack game files yourself:

Download PjOrion and extract it to any folder (Russian characters in the path are not recommended).
Run the program as administrator, open the settings window Terminal - Settings - Context menu... , check the box "Integrate into the Explorer context..." and click the "Apply..." button.
Exit the program, go to the game folder and copy the World_Of_Tanks\res\scripts subfolder to any location .
Right-click on the copied scripts folder to open the Explorer context menu and select PjOrion - Decompile pyc-files - Uncompyle2 . Then wait for the program to finish running. You can monitor the decompilation progress using the statistics at the bottom of the program in the status bar.
After decompilation is complete, unpack the XML files. To do this, open the context menu of the explorer on the folder again and select the command PjOrion - Unpack XML-files , then wait for completion.

---

## 👤 Author: Tamás Nagy

🌍 [Portfolio](https://www.nagytamas93.hu)  
💻 [GitHub](https://github.com/nagytommy76)  
💼 [LinkedIn](https://www.linkedin.com/in/tamasnagy93/)
