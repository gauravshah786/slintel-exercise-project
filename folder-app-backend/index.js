require('dotenv').config();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const db = require('./db.js');
const { getToken, verifyToken } = require('./middleware/auth');
const { Document, UserCredentials } = require('./models');

const DEFAULT_PORT = 3001;
const INVALID_CREDENTIALS = 'Invalid username/password';
// const MS_IN_ONE_HOUR = 3600000;
// const cookieOptions = { httpOnly: true, maxAge: MS_IN_ONE_HOUR };

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/api/signup', async (req, res) => {
	const { username, password: plainTextPassword } = req.body;
	const password = await bcrypt.hash(plainTextPassword, 10);
	try {
		const response = await UserCredentials.create({ username, password });
		console.log('User created successfully: ', response);
    // res.cookie('token', getToken(username), cookieOptions);
    const token = getToken(username);
    return res.status(200).json({ data: { token }});
	} catch (error) {
		return res.status(500).json({ errorMessage: error });
	}
});

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
  try {
    const user = await UserCredentials.findOne({ username }).lean();
    if (!user) {
      return res.status(400).json({ errorMessage: INVALID_CREDENTIALS });
    }
    if (await bcrypt.compare(password, user.password)) {
      const userId = user._id.toString();
      const data = {
        username: user.username,
        token: getToken(userId)
      }
      return res.status(200).json({ data });
    }
    res.status(400).json({ errorMessage: INVALID_CREDENTIALS });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
});

// app.post('/api/logout', async (req, res) => {
	
// });

const columnsToGet = 'name _id fullPath parentId isFolder';

const formatElement = (element) => {
  const id = element._id.toString();
  delete element._id;
  console.log(element);
  return {
    ...element,
    id
  };
};

const getDocuments = async (req, res) => {
  const parentId = req.params.id || '';
  const { userId } = req.user;
  const isDeleted = false;
  try {
    const queryOptions = { userId, parentId, isDeleted };
    const documents = await Document.find(queryOptions, columnsToGet).lean();
    const files = [], folders = [];
    documents.forEach(element => {
      const formattedElement = formatElement(element);
      element.isFolder 
        ? folders.push(formattedElement)
        : files.push(formattedElement);
    });
    console.log(documents);
    return res.status(200).json({ data : { files, folders } });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

// Get folders and files for req.user for dir with id
app.get('/api/document/:id', verifyToken, getDocuments);
app.get('/api/document', verifyToken, getDocuments);

const createDocument = async (req, res) => {
  // TODO: check if required params are sent else throw error
  try {
    const { userId } = req.user;
    const { name, parentFullPath, parentId, isFolder } = req.body;
    const fullPath = `${parentFullPath}/${name}`;
    const insertOptions = { userId, parentId, name, fullPath, isFolder };
    const doc = await Document.create(insertOptions);

    const document = {
      fullPath,
      id: doc._id.toString(),
      isFolder,
      name,
      parentId
    };
    return res.status(200).json({ data: { document } });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

app.post('/api/document', verifyToken, createDocument);

const renameDocument = async (req, res) => {
  // TODO: check if required params are sent else throw error
  // TODO: use regex to find all docs which contain current folder fullPath
  // update full path of lower heirarchy and rename current
};

app.patch('/api/document/:id', verifyToken, renameDocument);

const deleteDocument = async (req, res) => {
  // TODO: use regex to find all docs which contain current folder fullPath
  // and delete them
  try {
    const { userId } = req.user;
    const id = req.params.id;
    const queryOptions = { _id: id };
    const document = await Document.findOne(queryOptions, columnsToGet).lean();
    const { fullPath, isFolder } = document;
    // storing response in case we want to use it
    const updateResponse = await Document.updateOne(queryOptions, { isDeleted: true });
    if(isFolder){
      // regex to set isDeleted
      // 1. id - self delete
      // 2. path includes fullpath - deletes subFolders and files
      const regex = new RegExp(fullPath, 'i');
      console.log(regex);
      const query = { 
        fullPath: { $regex: regex },
        userId
      };
      // storing response in case we want to use it
      const updateManyRes = await Document.updateMany(query, { isDeleted: true });
    }
    
    return res.status(200).json({ data: { success: 'ok', document } });
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};

app.delete('/api/document/:id', verifyToken, deleteDocument);

// const createFile = async (req, res) => {
//   // TODO: check if required params are sent else throw error
//   try {
//     const { userId } = req.user;
//     const { name, parentFullPath, parentId } = req.body;
//     const newFileFullPath = `${parentFullPath}/${name}`;
//     const insertOptions = { userId, parentId, name, fullPath: newFileFullPath };
//     const doc = await File.create(insertOptions);

//     const file = {
//       fullPath: doc.fullPath,
//       id: doc._id.toString(),
//       name: doc.name
//     };
//     return res.status(200).json({ data: { file } });
//   } catch (error) {
//     return res.status(500).json({ errorMessage: error });
//   }
// };

// app.post('/api/file', verifyToken, createFile);

const port = process.env.PORT || DEFAULT_PORT;

db.initDB((err) => {
  if(err){
    console.error(`Error connecting to MongoDB. ${err}`);
  } else {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  }
});