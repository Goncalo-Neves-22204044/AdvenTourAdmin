# Dockerfile
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose Vite or CRA dev port
EXPOSE 5173 3000

# Start the dev server
CMD ["npm", "run", "dev"] # Or "start" if using Create React App
