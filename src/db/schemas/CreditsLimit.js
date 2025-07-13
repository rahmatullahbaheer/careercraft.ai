const mongoose = require("mongoose");
const { Schema } = mongoose;

const CreditsLimitSchema = new Schema({
    resume_summary_generation: Number,
    resume_basicInfo: Number,
    resume_skills: Number,
    resume_individualWorkExperience: Number,
    linkedin_keywords_generation: Number,
    linkedin_headline_generation: Number,
    linkedin_about_generation: Number,
    linkedin_individualWorkExperience: Number,
    cover_letter_generation: Number,
    email_generation: Number,
    pdf_files_upload: Number,
    review_resume: Number,
    consulting_bids_generation: Number,
    save_resume: Number,
    download_resume: Number,
})

module.exports = mongoose.models.CreditsLimit || mongoose.model("CreditsLimit", CreditsLimitSchema);
