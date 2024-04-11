const { PicModel } = require('./model.js');


class PicController {

    //. Controller function to handle GET request
    static GetPic = async (req, res) => {
        try {
            const userId = req.user.id;
            const pics = await PicModel.find({ userId })
            if (pics) {
                return res.status(200).json({ 'data': pics, });
            }
            return res.status(404).json({ message: 'pics data not found for the authenticated user' });
        } catch (error) {
            console.error('Error fetching pics:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    };

    //. Controller function to handle POST request
    static PostPic = async (req, res) => {
        try {
            const userId = req.user.id;
            const newPic = new PicModel(req.body);
            newPic.userId = userId;
            await newPic.save();
            return res.status(201).send({ 'data': newPic });
        } catch (error) {
            console.error('Error creating Kundli:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    //. Controller function to handle PUT request
    static UpdatePic = async (req, res) => {
        try {
            const userId = req.user.id;
            const updateData = await PicModel.findOneAndUpdate({ userId }, req.body, { new: true })
            return res.status(200).json({ 'message': 'Data Updated Successfully', 'data': updateData });
        } catch (error) {
            console.error('Error updating Kundli:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    //. Controller function to handle DELETE request
    static DeletePic = async (req, res) => {
        try {
            const userId = req.user.id;
            const deletedPic = await PicModel.findOneAndDelete({ userId: userId });

            if (!deletedPic) {
                return res.status(404).json({ message: 'Kundli not found' });
            }
            return res.status(200).json({
                'message': 'Data Deleted Successfully', 'data': deletedPic
            });
        } catch (error) {
            console.error('Error deleting Kundli:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };



}




module.exports = { PicController }