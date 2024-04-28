# Final Project Detail

## Structural Requirements
* All the js file about data is in the `finalProject/src/data`, like the production detail and image used in the frontend
* The images data store in the image.txt and the images store in `finalProject/images`
* The backend files are in the `/finalProject`, all react files are in the `finalProject/src`
* Create the package.json so you can run my project by `npm run build`,and then `npm start`. The server will start at `http://localhost:3000`
* Change the .eslintrc.cjs so I can setPage to render to different pages

## Services
* My project used express, cookie-parser, uuid libraries in the backend
* For REST, I use get, post, put, patch, and delete all of the REST method.
    - GET is to get the username when user login(`app.get('/api/session')`) and get the cart value after user login(`app.get('/api/cart')`)
    - POST is post to add the new username(`app.post('/api/session')`). If the user is the first time login, I will create a cart for the new user.
    - POST is also post to add the new production to the cart(`app.post('/api/cart')`). If user wants to add new items to the cart, the backend will get the production name and production from the frontend. Then add to the cart in backend
    - PUT is used to overwrite the item in the cart(`app.put('/api/cart/:productionName')`). If user wants to change the item's number, I will get the number from the frontend and overwrite the former number for this item
    - PATCH is used to update the item in the cart(`app.patch('/api/cart/:productionName')`). If user want to add or minus the item number for the exist item, I will use PATCH to update the number for this item in the cart
    - DELETE is used to logout(`app.delete('/api/session')`) and clear all of the items in the cart when user clicks checkout(`app.delete('/api/cart')`).

## FRONTEND
* Ny project all uses REACT based frontend.
* I used Header to change the page and setpage here(Header.jsx)
    - I set the `<a>` in the Header's link to render to different page, but it did change the page state and JS state matched URL when reload
    - I used popstate to store the url when reload the page, so it won't render to other page when reload or refresh the page
* I created 4 main REACT jsx page and I used setPage method in the lecture of pages-and-views to change the page
* Home Page(Home.jsx/HomeMainPanel.jsx/GameDetail.jsx)
    - The Home Page is some production's introduction, I import the data from HomeCard.js. There is no fetch part for this page
    - Each card all has a **BUY** link to render to **GameDetail page**
* Store Page(GameStore.jsx/GameCart.jsx)
    - This page is used to show the productions and production's details. Like production's image(Pimage), production's name(Pname), production's categories(Pcategories), production's price(Price), production's quantity(number), production's subTotal
    - Click the add to cart button will **add one** items to the cart(you need to click slowly, not continue to click it beacause 
    sometimes the server is lagging)
    - If the production is already in the cart, it will use the update method to patch(update) the quantity in the cart. If the production is not in the cart, it will use the add method to post the new production with 1 quantity to the cart.
    - Click the view cart button will show the cart
    - View Cart(GameCart.jsx)
        - View cart will show all the items you added to the cart
        - On the top of cart, it will show your username here
        - In the cart, you will see the production's name(Pname), production's image(Pimage), production's price(Price), production's subtotal price(subTotal). 
        - And you can edit the number of each items here. Click minus button will minus one quantity, click add button will add one quantity. If you keep to reduce the production's quantity to 0, this production won't be shown in the cart
        - On the bottom of the cart, it will show the total price if all the items in the cart
        - Click the checkout button, it will clear the cart
        - If the cart is empty, it will show `Nothing in the cart yet, add one!`
        - Cilck the hide cart button will hide the cart
* Game Detail Page(GameDetail.jsx)
    - When you click the **BUY** link from the home page, it will render to the GameDetail page.
    - Here you can select which product you want to buy, and input the quantity you want to buy. Then the frontend will help you to calculate the subtotal price based on the product and input quantity.
    - When you click the add to cart. If the production is already in the cart, it will use the update method to patch(add) the quantity to the cart. If the production is not in the cart, it will use the add method to post the new production with your input quantity to the cart.
* About Page(About.jsx/CarouselImage.jsx/Accordions.jsx)
    - There is a carousel image on the top of the page which will switch 3 different page continuously(CarouselImage.jsx).
    - Below the carousel image, there is an introduction for the company.
    - On the bottom of the page, there is a accordion page for Q&A(Accordions.jsx).
        - When you click the accordion question, it will extend to show the answer
* Footer
    - Privacy

## Some Important Extra Requirements
* Polling when you add the items to cart every 2000ms
* Render to different URL by setPage and pushState
* UI
    - All pages' background color is based on blue
    - All font color is based on orange
    - Logout button use different color to other button
    - The content use different font size for visualization
    - You can use the back arrow as the back button because I use the pushState to store the url
    - Use media to change the visualization when change the width of the page
