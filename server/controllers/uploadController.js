export const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file was uploaded");
      return res.status(400).json({ error: "No file received by server" });
    }

    const fileUrl = req.file.path; // Cloudinary provides this if file uploaded successfully
    res.status(200).json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload failed:");
    console.dir(error, { depth: null }); // ✅ better error output
    res.status(500).json({ error: error.message || "Upload failed" });
  }
};
