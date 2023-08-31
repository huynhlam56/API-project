'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        {
          spotId: 1,
          url: 'https://pictures.escapia.com/CINBCH/186791/4019170258.jpg',
          preview: true
        },
        {
          spotId: 1,
          url: 'https://photos.zillowstatic.com/fp/7e74b9bb689641eddd859f7a63ba4ca1-p_e.jpg',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1194i215%2Ftskcrzf2tygxm461z7524ej023i215&option=N&h=472&permitphotoenlargement=false',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/b318a29bbc2918a19cda11539006794a-full.jpg',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://photos.zillowstatic.com/fp/8af0b87f4e2fd0403f15d0214a50d4a8-p_e.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://img.geocaching.com/waymarking/display/12bce2fb-bf42-44df-bbd4-8a53013d741f.jpg',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://www.pufikhomes.com/wp-content/uploads/2023/02/arki-i-skruglennye-ugly-v-dome-v-kalifornii-pufikhomes-1.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://images.wsj.net/im-643717/?width=700&height=467',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://photos.zillowstatic.com/fp/be4f4585a1329ecd90962f64a2d9ff59-p_e.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDeoE_meuy0EC1EM7EetGGPO2M3Uszj0Xfg&usqp=CAU',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/03/New-York-apartment-style-concept-by-Decorilla.jpg',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://cdn.vox-cdn.com/thumbor/07dcVb4uqddWeKkFBvEKi-_mQGo=/0x0:4012x2700/1200x0/filters:focal(0x0:4012x2700):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13712472/House_Calls_Anderson_Greenspan_NewYork_bedroom_1.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://static01.nyt.com/images/2020/11/01/realestate/29OTM-NYC-slide-0WQQ/29OTM-NYC-slide-0WQQ-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://static01.nyt.com/images/2023/02/09/realestate/09OTM-NYC-71E77/09OTM-NYC-71E77-videoSixteenByNine1050.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://cdn.vox-cdn.com/thumbor/tUvkJL5OAoLVF73T9oMMOqKPmmQ=/0x0:4049x2700/1200x675/filters:focal(1702x1027:2348x1673)/cdn.vox-cdn.com/uploads/chorus_image/image/62953410/House_Calls_Anderson_Greenspan_NewYork_living.6.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://portlandmaine.com/wp-content/uploads/2022/02/Upper-Exchange-Street-1-scaled.jpeg',
          preview: true
        },
        {
          spotId: 4,
          url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2023/03/Living-room-by-one-of-the-top-Portland-Maine-interior-design-firms-Caity-H.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://www.thespruce.com/thmb/Rup8masV3lF0MiJZsZ_Sk526J-8=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/stunning-master-bedroom-design-ideas-4125545-hero-5782adcdc758407b884d92da7dbcbcbd.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/castlery/image/upload/v1664532155/blogs/Bedroom%20design%20ideas%20for%20the%20modern%20home/Madison_Bed_Bisque_Set_Seb_Nightstand_Bedside_Table.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://d3qyu496o2hwvq.cloudfront.net/wp-content/uploads/2022/08/2022-MHD-Art-Guide-Blue-Hill-Cabinetry-%C2%A9-Jeff-Roberts-Imaging-7-scaled.jpg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://www.abodeparkcity.com/wp-content/uploads/2023/02/Book-the-best-Park-City-Vacation-Rentals-with-Abode-Park-City-Now-scaled.jpeg',
          preview: true
        },
        {
          spotId: 5,
          url: 'https://npr.brightspotcdn.com/dims4/default/d12b409/2147483647/strip/true/crop/6000x4000+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkuer%2Ffiles%2F201912%2Fhomes_houses_baa.jpeg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://traveler.marriott.com/wp-content/uploads/2016/05/salt-lake-city-skyline.jpg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1004314632/photo/downtown-salt-lake-city-view.jpg?s=612x612&w=0&k=20&c=h9W7HWiNoUcfpHhd8yqrRDVkJZ7JnS-08slqY8NAsL8=',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sltrib/LSGOG2GTRJE2JH5IUIFCOYWPNA.JPG',
          preview: false
        },
      ], options)
    }catch (error) {
      console.error('Error:', error)
      throw Error
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options.tableName, null, options)
  }
};
