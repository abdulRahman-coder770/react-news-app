FROM node:13.10.1-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install react-router-dom
RUN npm install redux
RUN npm install react-redux
RUN npm install react-bootstrap
RUN npm install formic --save
RUN npm install yup
RUN npm install axios
RUN npm install @mui/material @emotion/react @emotion/styled @mui/material/core
RUN npm install --save react-toastify
RUN npm install react-select-country-list --save
RUN npm install react-datepicker --sav


ENTRYPOINT npm start