/**
 * Created by z0d14c on 07/02/15.
 */
db = db.getSiblingDB('mean-dev1');
//should update all users health to 100/100
db.users.update({}, { $set: {currentHealth: 100, maxHealth: 100}});