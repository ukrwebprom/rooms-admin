export const STATUS = {
  FREE: 'free',
  RESERVED: 'reserved', 
  CHECKED_IN: 'checkin', 
  DUE_OUT: 'dueout', 
  CHECKED_OUT: 'checkout', 
  OUT_OF_SERVICE: 'noservice'
};

export const ROOM_TYPE = {
  STANDARD: "STANDARD",
  COMFORT: "COMFORT",
  LUX: "LUX",
  FAMILY: "FAMILY",
  PENTHOUSE: "PENTHOUSE",
};

export const USER_STATUS = {
  ACTIVE: {name:'ACTIVE', bg:"#66ff99"},
  PENDING: {name: 'PENDING', bg:'#999'},
  LOCKED: {name:'LOCKED', bg:'#ff6699'},
  DISABLED: {name:'DISABLED', bg:'#000'}
}

export const ABILITIES = {
  user_create: 'Create users',
  user_edit: 'Edit users',
  user_watch: 'Watch user data',
  hotel_any: 'Any actions on hotels',
  hotel_create: 'Add hotel'
}