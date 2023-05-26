# Welcome to Groupies

Groupies is a vibrant social platform where like-minded individuals can connect, create and join groups, and express themselves using animated GIFs from Giphy. Join us and let's rock the online community together!

## Features

-   **Create and Join Groups:** Discover and become a member of various groups based on your interests, hobbies, or favorite topics. Engage in exciting discussions and be a part of a community that shares your passions.
    
-   **Express with Giphy:** Add animated GIFs from Giphy to your posts and comments to spice them up. Share your emotions, reactions, and funny moments in a unique and lively way.
    
-   **Personalized Profiles:** Create your own dynamic profile with personalized pictures, catchy bios, and a collection of animated GIFs. Let your personality shine and make a memorable impression within the Groupies community.
    
-   **Group Management:** Take charge and start your own group! Be a trendsetter by inviting others to join your community. Share your love for music, art, sports, or any other interest that fuels your creativity.
    
-   **Interact and Connect:** Show appreciation by liking and commenting on posts, initiating engaging conversations. Connect with fellow Groupies, make new friends, and build a supportive network.
    
-   **Discover New GIFs:** Explore an extensive library of animated GIFs from Giphy. Discover trending, funny, and expressive GIFs that perfectly capture your thoughts and moods.


## Groupies Setup Checklist

To get started with Groupies, follow these steps:

 

[ ] Open your terminal or command prompt and navigate to your desired source directory.
 - [ ]  Run the following command to clone the Groupies repository and create a new directory `git clone https://github.com/pan2dora/Groupies_FP.git NAMENEWDIRECTORY`
 - [ ] Remove the existing Git information from the main directory: `rm -rf NAMENEWDIRECTORY/.git`

 - [ ] Initialize your own Git repository in the main directory: `cd NAMENEWDIRECTORY git init`

 - [ ] Install the required dependencies for both the client and  server:  	 Client
	 - [ ] `cd client`
	 - [ ] `npm install` 	 Install Semantic UI && Tailwind CSS package via npm:	
	  - [ ] `npm install semantic-ui-react`
	 - [ ] `npm install tailwindcss`
	 - [ ]  `npx tailwindcss init` 	 Import the Semantic UI CSS in your project. You can typically import it in your main stylesheet or entry file:	 
 - [ ]   `import 'semantic-ui-css/semantic.min.css`    A `tailwind.config.js` file in should have generayed your project directory. Customize the configuration as per your requirements. Include the Tailwind CSS styles in your project's main stylesheet. You can typically import it in your main stylesheet or entry file:

 - [ ] `@import 'tailwindcss/base';               
     @import 'tailwindcss/components';   
     @import  'tailwindcss/utilities';` 

## Getting Giphy API Key

To use the Giphy API in Groupies, you need to obtain an API key from the Giphy Developer Portal. Here's how you can get your own API key:

 - [ ] Visit the [Giphy Developer Portal](https://developers.giphy.com/)
       in your web browser.
       
 
 - [ ]   If you don't already have an account, click on the "Create an Account" button and follow the instructions to sign up for a new
              account. If you have an account, simply log in.

       
        

 - [ ] Once you're logged in, navigate to the "Create an App" page.
              
         
 - [ ] Fill out the required information for your app, including the app name, description, and other relevant details.
       These details
              will help Giphy understand your use case.

    

 - [ ] Accept the terms and conditions, and click on the "Create App" button to create your app.
              
           
 - [ ] After your app is created, you'll be redirected to the app's dashboard. Here, you'll find your unique API key under the
       "API
              Keys" section. Copy this API key.

   

 - [ ]  Open the Groupies application and locate the configuration file where the Giphy API key is used. It could be a file named
              `config.js`, `constants.js`, or similar.
              
     
 - [ ] In the configuration file, find the place where the Giphy API key
       is expected and replace the existing value with the API key
       you copied from the Giphy Developer Portal.
                     
         
 - [ ]  Save the changes to the configuration file.

    

Once you have completed these steps, the Groupies application will be able to use your Giphy API key to fetch and display animated GIFs.

Note: Keep your API key secure and avoid sharing it publicly. If you suspect your key has been compromised, you can regenerate a new key in the Giphy Developer Portal.

That's it! You now have your own Giphy API key and you're ready to use it in Groupies. Enjoy sharing animated GIFs with the community! 🎉

## Technologies Used

Groupies is built using the following technologies:

- Front-end: React, Semantic UI React
- Back-end: Node.js, Express
- Database: PostgreSQL
- Authentication: Auth0
- API: Giphy API

## Installation



Please ensure that your code follows the existing coding style and includes appropriate tests.

Let's make Groupies an amazing platform where everyone can connect, share, and have a rocking time! 🎵🎉
