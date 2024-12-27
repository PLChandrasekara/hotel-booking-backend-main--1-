import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

export function createRoom(req, res) {
	if (!isAdminValid(req)) {
		res.status(403).json({
			message: "Forbidden",
		});
		return;
	}

	const roomData = req.body;

	//generate a room id by the maximum room id
	Room.find()
		.sort({ roomId: -1 })
		.limit(1)
		.then((result) => {
			if (result.length == 0) {
				roomData.roomId = 1;
			} else {
				roomData.roomId = result[0].roomId + 1;
			}
			const newRoom = new Room(roomData);
			newRoom
				.save()
				.then((result) => {
					console.log(result);
					res.json({
						message: "Room created successfully",
						result: result,
					});
				})
				.catch((err) => {
					console.log(err);
					res.json({
						message: "Room creation failed",
						error: err,
					});
				});
		}).catch((err) => {
      res.json({
        message: "Room creation failed",
        error: err,
      });
    });
}

//delete room
export function deleteRoom(req, res) {
	if (!isAdminValid(req)) {
		res.status(403).json({
			message: "Forbidden",
		});
		return;
	}

	const roomId = req.params.roomId;

	Room.findOneAndDelete({ roomId: roomId })
		.then(() => {
			res.json({
				message: "Room deleted successfully",
			});
		})
		.catch(() => {
			res.json({
				message: "Room deletion failed",
			});
		});
}

export function findRoomById(req, res) {
	const roomId = req.params.roomId;

	Room.findOne({ roomId: roomId })
		.then((result) => {
			if (result == null) {
				res.status(404).json({
					message: "Room not found",
				});
				return;
			} else {
				res.json({
					message: "Room found",
					result: result,
				});
			}
		})
		.catch((err) => {
			res.json({
				message: "Room search failed",
				error: err,
			});
		});
}

export function getRooms(req, res) {
	Room.find()
		.then((result) => {
			res.json({
				rooms: result,
			});
		})
		.catch(() => {
			res.json({
				message: "Failed to get rooms",
			});
		});
}

export function updateRoom(req, res) {
	if (!isAdminValid(req)) {
		res.status(403).json({
			message: "Forbidden",
		});
		return;
	}

	const roomId = req.params.roomId;

	Room.findOneAndUpdate(
		{
			roomId: roomId,
		},
		req.body
	)
		.then(() => {
			res.json({
				message: "Room updated successfully",
			});
		})
		.catch(() => {
			res.json({
				message: "Room update failed",
			});
		});
}
export function getRoomsByCategory(req, res) {
	const category = req.params.category;
	Room.find({ category: category })
		.then((result) => {
			res.json({
				rooms: result,
			});
		})
		.catch(() => {
			res.json({
				message: "Failed to get rooms",
			});
		});
}
