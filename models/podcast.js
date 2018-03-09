'use strict';
module.exports = (sequelize, DataTypes) => {
  var Podcast = sequelize.define('Podcast', {
    podid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {});
  Podcast.associate = function(models) {
    // associations can be defined here
    Podcast.belongsToMany(models.User, {through: 'user_podcast'});
  };
  return Podcast;
};