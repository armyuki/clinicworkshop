const express = require('express');
const router = express.Router();
//ฐานข้อมูล
// const ObjectId = require('mongodb').ObjectId;
const { ObjectId } = require('mongodb');
const Clinic = require('./schema/clinic');
const Customer = require('./schema/customer');
const Pet = require('./schema/pet');
const Health = require('./schema/health');
const Medicine = require('./schema/medicine');
const Health_medicine = require('./schema/health_medicine');
const Report = require('./schema/report');

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/clinicInfo', function (req, res, next) {
  Clinic.findOne({}, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/clinicSave', function (req, res, next) {
  let data = {
    name: req.body.name,
    tel: req.body.tel,
    tax: req.body.tax,
    address: req.body.address
  }
  Clinic.insertMany(data, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs)
    }
  })
})

router.post('/clinicUpdate', function (req, res, next) {
  Clinic.updateOne({ _id: req.body._id }, req.body, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/customerSave', function (req, res, next) {
  let data = {
    code: req.body.code,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    tel: req.body.tel,
    lineid: req.body.lineid
  }
  Customer.insertMany(data, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.get('/customerAll', function (req, res, next) {
  Customer.find({}, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})
router.post('/customerDelete', function (req, res, next) {
  Customer.deleteOne({ _id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})
router.post('/customerUpdate', function (req, res, next) {
  let condition = { _id: req.body._id }
  Customer.updateOne(condition, req.body, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})
router.post('/petSave', function (req, res, next) {
  req.body.customer_id = new ObjectId(req.body.customer_id)
  if (req.body._id == undefined) {
    // บันทึก
    Pet.insertMany(req.body, function (err, rs) {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  } else {
    // อัพเดต
    let condition = { _id: req.body._id }
    Pet.updateOne(condition, req.body, (err, rs) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  }
  req.body = {}
})

router.get('/petAll', function (req, res, next) {
  Pet.aggregate([
    {
      "$lookup": {
        "from": 'customers',// จาก document customers เอาข้อมูลจากนี้ docที่**1**
        'localField': 'customer_id', // โดยอ้างจากฟิลด์นี้ใน document pet มาไว้อ้างอิงนี้ docที่**2**
        'foreignField': '_id', // แล้วเอาจากข้างบนมาเทียบ docที่**1**
        'as': 'customer' // เพื่อส่งมานี่
      }
    }
  ]).then(function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/petDelete', function (req, res, next) {
  Pet.deleteOne({ _id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/petofCustomer', function (req, res, next) {
  Pet.find({ customer_id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/healthSave', function (req, res, next) {
  let data = {
    problem: req.body.health.problem,
    pet_id: req.body.pet._id,
    price: req.body.health.price,
    remark: req.body.health.remark,
    created_at: new Date()
  }
  Health.insertMany(data, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/healthOfPet', function (req, res, next) {
  Health.find({ pet_id: req.body.pet_id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/removeHealthofPet', function (req, res, next) {
  Health.deleteOne({ _id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/editHealthofPet', function (req, res, next) {
  let condition = { _id: req.body.health._id }
  let data = {
    problem: req.body.health.problem,
    pet_id: req.body.pet._id,
    price: req.body.health.price,
    remark: req.body.health.remark,
    created_at: new Date()
  }
  Health.updateOne(condition, data, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})


router.post('/medicineAll', function (req, res, next) {
  Medicine.find({}, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})


router.post('/medicineDelete', function (req, res, next) {
  Medicine.deleteOne({ _id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})


router.post('/medicineSave', function (req, res, next) {
  if (req.body._id == undefined) {
    // บันทึก
    Medicine.insertMany(req.body, function (err, rs) {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  } else {
    // อัพเดต
    let condition = { _id: req.body._id }
    Medicine.updateOne(condition, req.body, (err, rs) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  }
  req.body = {}
})

router.post('/healthMedicinesave', function (req, res, next) {

  if (req.body._id == undefined) {
    // บันทึก
    Health_medicine.insertMany(req.body, function (err, rs) {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  } else {
    // อัพเดต
    let condition = { _id: req.body._id }
    Health_medicine.updateOne(condition, req.body, (err, rs) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rs);
      }
    })
  }
  req.body = {}
})

router.post('/removeHistory', function (req, res, next) {
  Health_medicine.deleteOne({ _id: req.body._id }, function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/history', function (req, res, next) {
  req.body._id = new ObjectId(req.body._id);
  Health_medicine.aggregate([
    {
      "$lookup": {
        'from': 'medicines',
        'localField': 'medicine_id',
        'foreignField': '_id',
        'as': 'medicname'
      }
    }, {
      '$match': {
        health_id: req.body._id
      }
    }
  ]).exec(function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})

router.post('/showreport', function (req, res, next) {

  let fromdate = new Date(req.body.from)
  let todate = new Date(req.body.to)

  Health.aggregate([
    {
      "$match": {
        'created_at': {
          "$gte": fromdate,
          "$lte": todate
        }
      }
    },
    {
      "$sort": {
        "created_at": 1
      }
    },
    {
      "$lookup": {
        'from': 'pets',
        'localField': 'pet_id',
        'foreignField': '_id',
        'as': 'pet',
      }
    },
    {
      "$unwind": '$pet'
    },
    {
      "$lookup": {
        'from': 'customers',
        'localField': 'pet.customer_id',
        'foreignField': '_id',
        'as': 'customer',
      }
    }, {
      "$unwind": '$customer'
    }
  ]).exec(function (err, rs) {
    if (err) {
      res.send(err);
    } else {
      res.send(rs);
    }
  })
})



module.exports = router;
