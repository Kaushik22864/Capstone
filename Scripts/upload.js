async function uploadOCT(file) {
  try {
    // Get pre-signed URL from Lambda
    const response = await axios.post(
      "https://au6zjukrzlky36hgjsy73aiwae0jzvfu.lambda-url.ap-south-1.on.aws/",
      {
        fileName: file.name,
        fileType: file.type
      }
    );

    const { uploadUrl, key } = response.data;

    // Upload directly to S3
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type
      }
    });

    console.log("Uploaded to S3:", key);

    // Save to MongoDB
    await axios.post("http://localhost:5000/api/patients", { //need to make patient model, controller and route to save labelled image key in DB
      imageKey: key
    });

    return key;

  } catch (err) {
    console.error("Upload failed:", err);
  }
}