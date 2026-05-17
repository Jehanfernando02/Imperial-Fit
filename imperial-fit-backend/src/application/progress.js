import Progress from "../models/progress.model.js";

export const getProgressByUser = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }
        const progress = await Progress.find({ userId }).sort({ date: 1 });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProgress = async (req, res) => {
    try {
        const { userId, weight, date, notes } = req.body;
        const newProgress = new Progress({ userId, weight, date, notes });
        await newProgress.save();
        res.status(201).json(newProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProgress = async (req, res) => {
    try {
        const { id } = req.params;
        await Progress.findByIdAndDelete(id);
        res.status(200).json({ message: "Progress deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
