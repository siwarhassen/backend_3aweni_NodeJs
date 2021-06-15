const Users_accepted = require('../models/user_aceptedModel')
const Jobs = require('../models/job')
const Users = require('../models/User')
const sendMail = require('./sendMailaymen')
const fs = require('fs')
const pdf = require('pdf-parse')
var pdf_html = require('html-pdf');
const Cv = require('../models/cv')
const useracceptedCtrl = {
    postuler: async (req,res) => {




        try {
          


            let i = 0;
       

            const {Job,user} = req.body;
       
     
            let dataBuffer = fs.readFileSync('pdf_cv_1.pdf');
         
           const job = await Jobs.findById(Job, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              
            }
        })

        const user_a = await Users.findById(user, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              
            }
        })
       const  {email} = user_a;
       console.log(email)
          
            pdf(dataBuffer).then( async function(data) {
               
              
                
                job.skills.forEach( function(item) {
    
    
             
                    if (data.text.includes(item))
                    {
                        i++;
                    }
                   
                 
                    
                  });
               
                  if (i>5)
                  i=5; 
                  var currentDate = new Date();
                  currentDate.addDays(5);      
                  const newUser = new Users_accepted({
                    user:req.body.user, societe:req.body.societe ,Job:req.body.Job,note_cv:i,date_interview:currentDate
                })
                await newUser.save()

              

       
                const url = `https://3aweni.netlify.app/update_note_technique/${newUser._id}`
                sendMail(email,url,"Test Technique","Test Technique")         
            
               
              
            });
    
         
            res.json({msg:"user has been acepted!"})
          
        
        } catch(err){
            return res.status(500).json({msg: err.message})
        }



    },
    update_note_final : async (req,res) => {




        try {
          
            const {user_accepted,note_interview} = req.body;
           
     
         
       
           const user = await Users_accepted.findById(user_accepted, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log(docs);
            }
        })
          
        const {note_cv,note_technique,_id} = user

        let note_final =parseInt(note_cv)+ parseInt(note_interview) +parseInt(note_technique);
        let etat_interview="fait"
        
          user.note_final=note_final;
          user.etat_interview=etat_interview;
            await user.save();
            res.json({msg: "Update Success"}) 
         
          
        
        } catch(err){
            return res.status(500).json({msg: err.message})
        }



    },
    getUsersAllInfo: async(req,res) => {
        try {
    
            const users = await Users_accepted.find()
            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})      
        }
    },
    deleteUser: async (req,res) => {
     
        try {
        await Users_accepted.findByIdAndDelete(req.params.id)  
        res.json({msg: "Deleted Success"}) 
        } catch (err) {
                    return res.status(500).json({msg: err.message})      
                }   
    },
    update_date_interview : async (req,res) => {




        try {
          
            const {user_accepted,date_interview} = req.body;
           
     
         
            const user_accpted = await Users_accepted.findById(user_accepted, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                 
                }
            })
              
            const {user} = user_accpted

            const user_a = await Users.findById(user, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                  
                }
            })
           const  {email} = user_a;
       

    
          
            await Users_accepted.findOneAndUpdate(user_accepted, {
                date_interview
            })  
            res.json({msg: "Update Success"}) 
                     
            const url = `https://meet.google.com/uny-csii-awa`
            sendMail(email,url,"Lien Meet",`Lien Meet Le ${date_interview}`)     
          
        
        } catch(err){
            return res.status(500).json({msg: err.message})
        }



    },
    filtrerUsersAll: async(req,res) => {
        try {
    
            const {Job} = req.body;
       
     
           console.log("hi")
         
           const job = await Jobs.findById(Job, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              
            }
        })
            const users = await Users_accepted.find().sort({note_final:'descending'}).limit(job.nbEmployees)

            await Users_accepted.remove()
            await Users_accepted.collection.insertMany(users)
            users.forEach(
                async (e) => {
                    
                    const {Job,user} = e;
                    const user_a = await Users.findById(user, function (err, docs) {
                        if (err){
                            console.log(err);
                        }
                        else{
                          
                        }
                    })
                     
           const job = await Jobs.findById(Job, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              
            }
        })
                
                    var html=`<h1>Welcome MR/MRS ${user_a.username} </h1>
                    <br>
                    <h3> voici notre contrat avec notre societe votre salaire est ${job.salary} et votre jobType ${job.jobType} </h3>
                    <div style="position:absolute;left:50%;margin-left:-297px;top:0px;width:595px;height:842px;border-style:outset;overflow:hidden">
                    <div style="position:absolute;left:0px;top:0px">
                    <img src="931e3692-aed0-11eb-8b25-0cc47a792c0a_id_931e3692-aed0-11eb-8b25-0cc47a792c0a_files/background1.jpg" width=595 height=842></div>
                    <div style="position:absolute;left:171.67px;top:117.25px" class="cls_003"><span class="cls_003">Employee Contract</span></div>
                    <div style="position:absolute;left:60.02px;top:166.93px" class="cls_006"><span class="cls_006">This contract, dated on the   day of  in the year</span></div>
                    <div style="position:absolute;left:309.73px;top:166.93px" class="cls_006"><span class="cls_006">, is made between ${user_a.username} </span></div>
                    <div style="position:absolute;left:63.38px;top:183.25px" class="cls_007"><span class="cls_007">and  ${user_a.username}  of  .</span></div>
                    <div style="position:absolute;left:60.02px;top:199.57px" class="cls_007"><span class="cls_007">This document constitutes an employment agreement between these two parties and</span></div>
                    <div style="position:absolute;left:60.02px;top:218.55px" class="cls_007"><span class="cls_007">is governed by the laws of TUNISIA</span></div>
                    <div style="position:absolute;left:60.02px;top:248.55px" class="cls_008"><span class="cls_008">WHEREAS </span><span class="cls_007">the Employer desires to retain the services of the Employee, and the</span></div>
                    <div style="position:absolute;left:60.02px;top:267.99px" class="cls_007"><span class="cls_007">Employee desires to render such services, these terms and conditions are set forth.</span></div>
                    <div style="position:absolute;left:60.02px;top:298.26px" class="cls_008"><span class="cls_008">IN CONSIDERATION </span><span class="cls_007">of this mutual understanding, the parties agree to the</span></div>
                    <div style="position:absolute;left:60.02px;top:317.70px" class="cls_007"><span class="cls_007">following terms and conditions:</span></div>
                    <div style="position:absolute;left:79.94px;top:364.26px" class="cls_008"><span class="cls_008">1. Employment</span></div>
                    <div style="position:absolute;left:100.13px;top:381.32px" class="cls_007"><span class="cls_007">The Employee agrees that he or she will faithfully and to the best of their ability</span></div>
                    <div style="position:absolute;left:100.13px;top:398.60px" class="cls_007"><span class="cls_007">carry out the duties and responsibilities communicated to them by the Employer.</span></div>
                    <div style="position:absolute;left:100.13px;top:415.88px" class="cls_007"><span class="cls_007">The Employee shall comply with all company policies, rules and procedures at</span></div>
                    <div style="position:absolute;left:100.13px;top:433.16px" class="cls_007"><span class="cls_007">all times.</span></div>
                    <div style="position:absolute;left:79.94px;top:463.40px" class="cls_008"><span class="cls_008">2. Position</span></div>
                    <div style="position:absolute;left:100.13px;top:480.46px" class="cls_007"><span class="cls_007">As a employee, it is the duty of the Employee to perform all essential job</span></div>
                    <div style="position:absolute;left:100.13px;top:497.98px" class="cls_007"><span class="cls_007">functions and duties. From time to time, the Employer may also add other</span></div>
                    <div style="position:absolute;left:100.13px;top:515.74px" class="cls_007"><span class="cls_007">duties within the reasonable scope of the Employee’s work.</span></div>
                    <div style="position:absolute;left:79.94px;top:545.98px" class="cls_008"><span class="cls_008">3. Compensation</span></div>
                    <div style="position:absolute;left:100.13px;top:563.05px" class="cls_007"><span class="cls_007">As compensation for the services provided, the Employee shall be paid a wage</span></div>
                    <div style="position:absolute;left:100.13px;top:576.73px" class="cls_007"><span class="cls_007">of TND</span></div>
                    <div style="position:absolute;left:76.82px;top:590.65px" class="cls_007"><span class="cls_007">4. Benefits</span></div>
                    <div style="position:absolute;left:100.13px;top:607.45px" class="cls_007"><span class="cls_007">The Employee has the right to participate in any benefits plans offered by</span></div>
                    <div style="position:absolute;left:100.13px;top:624.73px" class="cls_007"><span class="cls_007">the Employer. The employer currently offers . Access to these benefits will</span></div>
                    <div style="position:absolute;left:100.13px;top:642.01px" class="cls_007"><span class="cls_007">only be possible after the probationary period has passed. Probationary</span></div>
                    <div style="position:absolute;left:79.94px;top:672.27px" class="cls_008"><span class="cls_008">5. Period</span></div>
                    <div style="position:absolute;left:100.13px;top:689.31px" class="cls_007"><span class="cls_007">It is understood that the first of employment constitutes a probationary period.</span></div>
                    <div style="position:absolute;left:100.13px;top:706.59px" class="cls_007"><span class="cls_007">During this time, the Employee is not eligible for paid time off or other benefits.</span></div>
                    <div style="position:absolute;left:100.13px;top:723.87px" class="cls_007"><span class="cls_007">During this time, the Employer also exercises the right to terminate employment</span></div>
                    <div style="position:absolute;left:100.13px;top:740.94px" class="cls_007"><span class="cls_007">at any time without advance notice.</span></div>
                    <div style="position:absolute;left:543.34px;top:776.46px" class="cls_009"><span class="cls_009">1 </span><span class="cls_010"><sub>1</sub></span></div>
                    </div>
                    <div style="position:absolute;left:50%;margin-left:-297px;top:852px;width:595px;height:842px;border-style:outset;overflow:hidden">
                    <div style="position:absolute;left:0px;top:0px">
                    <img src="931e3692-aed0-11eb-8b25-0cc47a792c0a_id_931e3692-aed0-11eb-8b25-0cc47a792c0a_files/background2.jpg" width=595 height=842></div>
                    <div style="position:absolute;left:562.30px;top:150.13px" class="cls_011"><span class="cls_011">2</span></div>
                    </div>
                    <div style="position:absolute;left:50%;margin-left:-297px;top:1704px;width:595px;height:842px;border-style:outset;overflow:hidden">
                    <div style="position:absolute;left:0px;top:0px">
                    <img src="931e3692-aed0-11eb-8b25-0cc47a792c0a_id_931e3692-aed0-11eb-8b25-0cc47a792c0a_files/background3.jpg" width=595 height=842></div>
                    <div style="position:absolute;left:79.94px;top:56.50px" class="cls_008"><span class="cls_008">6. Jurisdiction</span></div>
                    <div style="position:absolute;left:100.13px;top:73.54px" class="cls_007"><span class="cls_007">This contract shall be governed, interpreted, and construed in accordance with</span></div>
                    <div style="position:absolute;left:100.13px;top:90.58px" class="cls_007"><span class="cls_007">the laws of TUNISIA .In witness and agreement whereof, the Employer has</span></div>
                    <div style="position:absolute;left:100.13px;top:107.62px" class="cls_007"><span class="cls_007">executed this contract with due process through the authorisation of official</span></div>
                    <div style="position:absolute;left:100.13px;top:124.69px" class="cls_007"><span class="cls_007">company agents and with the consent of the Employee, given here in writing.</span></div>
                    <div style="position:absolute;left:60.02px;top:155.65px" class="cls_007"><span class="cls_007">In witness and agreement whereof, the Employer has executed this contract with due</span></div>
                    <div style="position:absolute;left:60.02px;top:173.17px" class="cls_007"><span class="cls_007">process through the authorisation of official company agents and with the consent of the</span></div>
                    <div style="position:absolute;left:60.02px;top:190.93px" class="cls_007"><span class="cls_007">Employee, given here in writing.</span></div>
                    <div style="position:absolute;left:100.13px;top:315.54px" class="cls_007"><span class="cls_007">Employee Signature</span></div>
                    <div style="position:absolute;left:427.13px;top:315.54px" class="cls_007"><span class="cls_007">Date</span></div>
                    <div style="position:absolute;left:107.09px;top:430.04px" class="cls_007"><span class="cls_007">Company Official</span></div>
                    <div style="position:absolute;left:427.13px;top:430.04px" class="cls_007"><span class="cls_007">Date</span></div>
                    <div style="position:absolute;left:127.97px;top:446.60px" class="cls_007"><span class="cls_007">Signature</span></div>
                    <div style="position:absolute;left:562.30px;top:785.82px" class="cls_011"><span class="cls_011">3</span></div>
                    </div>
                   
    
                    `  
                    var options = { format: 'Letter' };
                    pdf_html.create(html, options).toFile(`./${user_a.username + e._id}.pdf`, function(err, res) {
                        if (err) return console.log(err);
                        console.log(res); // { filename: '/app/businesscard.pdf' }
                      });
                }
            )
           
            // or //
            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})      
        }
    },
    getUsersAllInfoJob: async(req,res) => {
        try {

            const users = await Users_accepted.find({Job: req.params.id }).populate({
                path:'user',
                model:'user'
              })
            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})      
        }
    },
    update_note_technique : async (req,res) => {




        try {
          
            const {user_accepted,note_technique} = req.body;
           
            console.log(user_accepted);
         
            const user_accpted = await Users_accepted.findById(user_accepted, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                    console.log(docs);
                }
            })
              
            const {user} = user_accpted

            const user_a = await Users.findById(user, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                  
                }
            })
       
    
          
            await Users_accepted.findOneAndUpdate(user_accepted, {
                note_technique
            })  
            res.json({msg: "Update Success"}) 
            const  {email} = user_a;
       
            const url = `https://3aweni.netlify.app/update_date_interview/${user_accpted._id}`
            sendMail(email,url,"Book Interview","book an interview")            
       
          
        
        } catch(err){
            return res.status(500).json({msg: err.message})
        }



    }


}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
}
module.exports = useracceptedCtrl