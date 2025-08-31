const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const mockdata = [
  {
    id: 11,
    username: "raj11",
    displayName: "Raj Malhotra",
    password: "raj@111",
  },
  {
    id: 12,
    username: "tina12",
    displayName: "Tina Kapoor",
    password: "tina@222",
  },
  {
    id: 13,
    username: "manoj13",
    displayName: "Manoj Tiwari",
    password: "manoj@333",
  },
  {
    id: 14,
    username: "kavya14",
    displayName: "Kavya Reddy",
    password: "kavya@444",
  },
  {
    id: 15,
    username: "alok15",
    displayName: "Alok Mishra",
    password: "alok@555",
  },
];

app.get("/write-file", (req, res) => {
  const filepath = path.join(__dirname, "new_file.txt");

  fs.writeFile(filepath, "this is test file", (err) => {
    if (err) {
      return res.status(500).send("failed to create a file");
    }

    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("sorry i cannot read your file");
      }
      res.status(200).send({ filepath: filepath, content: data });
    });
  });
});

app.get("/read-file", (req, res) => {
  const filepath = path.join(__dirname, "new_file.txt");

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("sorry i cannot read your file");
    }

    fs.appendFile(filepath, "\n new line append", (err) => {
      if (err) {
        return res.status(500).send("sorry i cannot write your file");
      }

      // ✅ Respond only once, after append success
      res.status(200).json({
        filepath: filepath,
        content: data,
        message: "✅ File read and new line appended",
      });
    });
  });
});

app.get("/append-file", (req, res) => {
  const filepath = path.join(__dirname, "new_file.txt");
  fs.appendFile(filepath, "/n hello i am from append", (err) => {
    if (err) {
      return res.status.send("soory i cannot write your file");
    }
  });
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("soory i cannt read your file");
    }
    res.header("content-type", "text/plain");
    res.status(200).send({
      filepath: filepath,
      content: data,
      message: "new message created",
    });
  });
});
app.get("/delete-file", (req, res) => {
  const filepath = path.join(__dirname, "new_file.txt");
  fs.unlink(filepath, (err) => {
    if (err) {
      res.status(500).send("fail to delte file");
    }
    res.status(200).send("file sussesfully deleted");
  });
});
app.get("/read-folder", (req, res) => {
  const folderPath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin"
  );

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("❌ Failed to read folder");
    }

    res.status(200).json({
      folderPath: folderPath,
      files: files, // array of filenames
      message: "✅ Successfully read folder",
    });
  });
});
app.get("/rename-file", (req, res) => {
  const filepath = path.join(__dirname, "new_file.txt");
  fs.rename(filepath, "test-file", (err) => {
    if (err) {
      res.status(500).send("failed to rename file");
    }
    res.status(200).send("sussesfully rename");
  });
});
app.get("/stream-text", (req, res) => {
  const filepath = (__dirname, "video.mp4");
  const search = fs.createReadStream(filepath);
  search.on("open", () => {
    search.pipe(res);
  });
  search.on("close", (err) => {
    return res.status(500).send("failed");
  });
});
app.get("/create-folder", (req, res) => {
  const filepath = path.join(__dirname, "javascript begin", "test-folder");
  fs.mkdir(filepath, (err) => {
    if (err) {
      res.status(500).send("sorry");
    }
    res.status(200).send("sussesfully created folder");
  });
});
app.get("/reanme-folder", (req, res) => {
  const filepath = (__dirname, "javascript begin", "test-folder");
  console.log(filepath);
  fs.rename(filepath, "we-are-done", (err) => {
    if (err) {
      res.status(500).send("sorry");
    }
    res.status(200).send("yes");
  });
});
app.get("/delete-folder", (req, res) => {
  const folderPath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "we-are-done"
  );

  console.log("Deleting folder:", folderPath);

  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Failed to delete folder");
    }
    res.status(200).send(`✅ Successfully deleted folder: ${folderPath}`);
  });
});

app.get("/read-pdf", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "Files",
    "Bpo_job.pdf"
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Failed to read PDF");
    }

    // Tell browser this is a PDF
    res.contentType("application/pdf");
    res.send(data);
  });
});
app.get("/json-file", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "mockUsers.json"
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("❌ sorry, file not found");
    }

    res.header("content-type", "application/json");
    res.status(200).send(data); // just show JS code as text
  });
});
app.get("/append-json", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "mockUsers.json"
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("❌ sorry, file not found");
    }

    let convert_object;
    try {
      convert_object = JSON.parse(data);
    } catch (e) {
      return res.status(500).send("❌ Invalid JSON format");
    }

    // Ensure it's an array
    if (!Array.isArray(convert_object)) {
      convert_object = [convert_object];
    }

    // Append new mockdata items
    convert_object.push(...mockdata);

    // Write back updated JSON
    fs.writeFile(filePath, JSON.stringify(convert_object, null, 2), (err) => {
      if (err) {
        return res.status(500).send("❌ sorry, could not write file");
      }

      res.status(200).json({
        filepath: filePath,
        newLength: convert_object.length,
        message: "✅ JSON file updated successfully",
        newData: convert_object.slice(-mockdata.length), // last inserted data
      });
    });
  });
});
app.get("/write-json", (req, res) => {
  const filepath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "test.json"
  );
  fs.writeFile(filepath, JSON.stringify(mockdata), (err) => {
    if (err) {
      res.status(500).send("sorry");
    }
    res.status(200).send("yes");
  });
});
app.get("/readr-img", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "upload",
    "img.jpg"
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("❌ sorry, cannot read image");
    }
    res.setHeader("Content-Type", "image/jpeg"); // ✅ Correct MIME type
    res.status(200).send(data); // ✅ Send the image binary
  });
});
app.get("/file-info", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "upload",
    "img.jpg"
  );

  fs.stat(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("❌ sorry, cannot read image");
    }
    res.status(200).send(data); // ✅ Send the image binary
    console.log("files:", data.isFile());
    console.log("folder:", data.isDirectory());
    console.log("size:", data.size);
  });
});
app.get("/file-exist", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "upload",
    "img.jpg"
  );

  fs.access(filePath, (err) => {
    if (err) {
      return res.status(500).send("file not exist");
    }
    res.status(200).send("file  exist");
  });
});

app.get("/download", (req, res) => {
  const filePath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "Files",
    "Bpo_job.pdf"
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("File not found!");
    }
  });
});
app.listen(4000, (req, res) => {
  console.log("your port:4000");
});
