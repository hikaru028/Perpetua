# Step 1: Use the official Node.js image as the base
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /srv/app

# Step 3: Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Step 4: Copy the rest of your Strapi application
COPY . .

# Step 5: Expose the port your app runs on
EXPOSE 1337

# Step 6: Set the environment variables for production (Optional)
ENV NODE_ENV=production

# Step 7: Run Strapi when the container starts
CMD ["npm", "start"]
