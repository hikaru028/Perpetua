FROM node:18

# Install necessary dependencies (e.g., libvips-dev for image processing)
RUN apt-get update && apt-get install -y libvips-dev build-essential

# Set up environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set the working directory for the app
WORKDIR /opt/

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
WORKDIR /opt/app
COPY ./ .

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 1337

# Start the app
CMD ["npm", "start"]
