module.exports = {
  getJobs: (req, res) => {
    let db = req.app.get('db');
    let query = req.query;
    let findObj = {};
    if (query) {
      for (let prop in query) {
        switch (prop) {
        case 'salary':
          let salaryArr = query.salary.split(',');
          salaryArr[0] = parseInt(salaryArr[0]);
          salaryArr[1] = parseInt(salaryArr[1]);
          findObj['salary >='] = salaryArr[0];
          findObj['salary <='] = salaryArr[1];
          break;
        case 'title':
          let titleArr = query.title.toLowerCase().split(',').map(str => str.trim());
          findObj.or = [{ 'title': titleArr }, { 'title ilike': `%${query.title}%` }]
          break;
        case 'state':
          let stateArr = query.state.toLowerCase().split(',').map(str => str.trim());
          if (query.hasOwnProperty('title')) {
            findObj.or.forEach(obj => obj.or = [{ 'state': stateArr }, { 'state ilike': `%${query.state}%` }]);
          } else {
            findObj.or = [{ 'state': stateArr }, { 'state ilike': `%${query.state}%` }]
          }
          break;
        default:
          findObj[prop] = query[prop];
          break;
        }
      }
      db.jobs.find(findObj).then(jobs => {
        res.send(jobs)
      })
    }
    else {
      db.jobs.get_jobs().then(jobs => {
        res.send(jobs)
      })
    }
  },
  addJob: (req, res) => {
    let db = req.app.get('db');
    let data = req.body;
    let defaultPhone = '615-668-9287';
    let arr = [ data.companName, data.companyType, data.jobTitle, data.salary,
      data.street, data.city, data.state, data.zipcode,
      data.phone, data.postDate, data.experience, data.description,
      data.freeHousing, defaultPhone];
    db.jobs.add_job(arr).then(jobs => {
      console.log('success')
      res.status(200).send(jobs);
    })
  },
  getOneJob: (req, res) => {
    let db = req.app.get('db');
    db.jobs.get_one_job(req.params.id).then(job => {
      res.status(200).send(job);
    })
  },
  addAppliedJob: (req, res) => {
    let db = req.app.get('db');
    let data = req.body;
    let arr = [ data.id, data.person_name, data.person_city, data.person_state,
      data.person_phone, data.apply_date];
    db.jobs.add_applied_job(arr).then(job => {
      console.log(job, 'job');
      res.status(200).send(job);
    })
  }
};
