import config from '../../../config'
const Users = require('./../../../models/users');

const jwt = require('jsonwebtoken')

const DriveAPI = require('./../../../API/GDrive');

module.exports = async (req, res, next) => {
	const oauth2Client = req.oauth2Client;
	const {code, token} = req.body;
	try {
		// jwt token
		let decryptedToken = await jwt.verify(config.jwtHeader + token, config.jwtSecret);
		decryptedToken = decryptedToken.split("-")[0];

		const {tokens} = await oauth2Client.getToken (code);
		const refresh_token = tokens.refresh_token;

		

		const addToken = await Users.updateOne ({ uniqueID: decryptedToken }, {
			$set: {
				GDriveRefreshToken: refresh_token
			}
		})
		oauth2Client.setCredentials({refresh_token})

		//create a folder.
		const {ok, error, result} = await DriveAPI.createFolder( oauth2Client );
		if ( ok ) {
			const io = req.io
			io.in(decryptedToken).emit('googleDrive:linked');
			return res.json ({ success: true })
		} else {
			return res.json ({ success: false })
		}

	} catch (e) {
		return res.status(403).json ({ success: false })
	}
};
