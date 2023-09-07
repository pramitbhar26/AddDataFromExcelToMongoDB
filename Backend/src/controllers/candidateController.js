// import { eachSeries } from 'async';
import async from 'async';
// import eachSeries from 'async/eachSeries.js';
import Candidate from '../models/Candidate.js';
import pkg from 'exceljs';
const { Workbook } = pkg;
import multer, { memoryStorage } from 'multer';
import mongoose from 'mongoose';
const { findOne } = mongoose;
// Configure multer for file upload
const storage = memoryStorage();
const upload = multer({ storage });

const uploadCandidates = (req, res) => {
  upload.single('excelFile')(req, res, async (err) => {
    console.log("hello")
    if (err) {
      return res.status(400).json({ error: 'File upload failed.' });
    }

    const workbook = new Workbook();
    const buffer = req.file.buffer;

    try {
      await workbook.xlsx.load(buffer);
    //   await workbook.xlsx.readFile('C:/Users/prami/Downloads/klimb.xlsx.xlsx')
      const worksheet = workbook.getWorksheet(1);
    //   console.log("hello4");
    console.log("Excel data loaded successfully.");
console.log("Number of rows:", worksheet.rowCount);
// console.log("Rows:", worksheet.getRows(1,993));
      var i=2;
      async.eachSeries(worksheet.getRows(i,992), async function(row, callback){
        console.log("Processing row:", row.number);
        const candidateData = {
          Name: row.getCell(1).value,
          Email: row.getCell(2).value,
          // Add other properties from Excel here
            Mobile: row.getCell(3).value,
            DOB: row.getCell(4).value,
            Work_Experience:row.getCell(5).value,
            Resume_Title: row.getCell(6).value,
            Current_Location: row.getCell(7).value,
            Postal_Address: row.getCell(8).value,
            Current_Employer: row.getCell(9).value,
            Current_Designation: row.getCell(10).value
        };
        console.log("hello5");
        console.log(candidateData);
        // Check if the email already exists in the database
        // const existingCandidate = await findOne({ email: candidateData.email });

        // if (!existingCandidate) {
        //   const candidate = new Candidate(candidateData);
        //   console.log("hello3")
        //   try {
        //     await candidate.save();
        //     console.log("hello2")
        //     callback(); // Continue processing the next row
        //   } catch (error) {
        //     callback(error); // Handle the error if the candidate couldn't be saved
        //   }
        // } else {
        //   // Skip the row if the candidate already exists in the database
        //   callback();
        // }


        try {
            // Check if the email already exists in the database
            console.log("hello108")
            const existingCandidate = await Candidate.findOne({ Email: candidateData.Email });
            console.log(existingCandidate);
            if(!existingCandidate) {
              const candidate = new Candidate(candidateData);
              console.log("Saving candidate:", candidateData);
              await candidate.save();
              console.log("Candidate saved successfully");
            //   callback(); // Continue processing the next row
            } else {
              // Skip the row if the candidate already exists in the database
              console.log("Candidate with email already exists. Skipping.");
            //   callback();
            }
            i++;
            // callback();
          } catch (error) {
            console.error("Error processing candidate:", error);
            callback(error); // Handle the error if the candidate couldn't be saved
          }

      }, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error processing candidates.' });
        }

        return res.status(200).json({ message: 'Candidates added successfully.' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error processing Excel file.' });
    }
  });
};

export{
  uploadCandidates
};
