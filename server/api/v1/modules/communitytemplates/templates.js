module.exports = [{
  /* template for the surgeon -- medical community*/
  name: 'Surgeon',
  purpose: 'Medical',
  image: 'https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fwww.carwreckdoctor.com%2Fhs-fs%2Fhubfs%2FCar_Accident_Doctor.png%3Ft%3D1492111617130%26width%3D302%26name%3DCar_Accident_Doctor.png&imgrefurl=http%3A%2F%2Fwww.carwreckdoctor.com%2F&docid=hSJVNS_oCvD0DM&tbnid=IGV66zJr-J6ReM%3A&vet=10ahUKEwjAqr6Q7YrVAhXKRY8KHR0FDro4ZBAzCAYoBDAE..i&w=302&h=273&bih=810&biw=1535&q=doctor%20png&ved=0ahUKEwjAqr6Q7YrVAhXKRY8KHR0FDro4ZBAzCAYoBDAE&iact=mrc&uact=8',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tags: ['medcare', 'doctor'],
  // tools available for the surgeon medical community
  tools: [{
    toolId: 'forum',
    toolName: 'Forum',
    avatar: 'http://www.tudiabetes.org/forum/uploads/default/original/3X/3/5/35d47232d1d9cb26dcd2a226952f98137a9080c8.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    toolName: 'WeMedUp- A Medical Tool',
    avatar: 'http://www.wemedup.com/img/logo.png',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    toolName: 'Sermo- A Tool for Surgeons',
    avatar: 'http://www.worldpharmanews.com/images/logo/sermo.png',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['like', 'remove'],
  }],
  // role actions for the surgeon medical community
  roleActions: [{
    role: 'owner',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'WeMedUp',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'admin',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'moderator',
    toolsActions: [{
      toolId: 'WeMedUp',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'member',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }],
}, { /* template for the specialists -- medical community*/
  name: 'Specialists',
  purpose: 'Medical',
  image: 'https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fwww.carwreckdoctor.com%2Fhs-fs%2Fhubfs%2FCar_Accident_Doctor.png%3Ft%3D1492111617130%26width%3D302%26name%3DCar_Accident_Doctor.png&imgrefurl=http%3A%2F%2Fwww.carwreckdoctor.com%2F&docid=hSJVNS_oCvD0DM&tbnid=IGV66zJr-J6ReM%3A&vet=10ahUKEwjAqr6Q7YrVAhXKRY8KHR0FDro4ZBAzCAYoBDAE..i&w=302&h=273&bih=810&biw=1535&q=doctor%20png&ved=0ahUKEwjAqr6Q7YrVAhXKRY8KHR0FDro4ZBAzCAYoBDAE&iact=mrc&uact=8',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tags: ['medcare', 'doctor', 'therapy'],
  // tools available for the specialists medical community
  tools: [{
    toolId: 'forum',
    toolName: 'Forum',
    avatar: 'http://www.tudiabetes.org/forum/uploads/default/original/3X/3/5/35d47232d1d9cb26dcd2a226952f98137a9080c8.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    toolName: 'WeMedUp- A Medical Tool',
    avatar: 'http://www.wemedup.com/img/logo.png',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    toolName: 'Sermo- A Tool for Surgeons',
    avatar: 'http://www.worldpharmanews.com/images/logo/sermo.png',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['like', 'remove'],
  }],
  // role actions for the specialists community
  roleActions: [{
    role: 'member',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'WeMedUp',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'owner',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'admin',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'WeMedUp',
      actions: { bookmark: 'self', post: 'post_self' },
    }],
  }, {
    role: 'moderator',
    toolsActions: [{
      toolId: 'sermo',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }],
}, { /* template for the developer's -- technical community*/
  name: 'Developer',
  purpose: 'Technical',
  image: 'https://www.google.co.in/imgres?imgurl=http%3A%2F%2Fkrutitech.com%2Fwp-content%2Fuploads%2F2011%2F04%2Famc1.png&imgrefurl=http%3A%2F%2Fkrutitech.com%2F2011%2F04%2F18%2Ftechnical-support%2F&docid=3ybQwCg9TndorM&tbnid=z-Bzabs5N3MxwM%3A&vet=10ahUKEwj19LD47IrVAhVIOo8KHeMKAtoQMwh6KAEwAQ..i&w=388&h=348&bih=810&biw=1535&q=technical%20images%20png&ved=0ahUKEwj19LD47IrVAhVIOo8KHeMKAtoQMwh6KAEwAQ&iact=mrc&uact=8',
  description: 'This template will provides you the required tools and roles to create a technical community',
  tags: ['IDE', 'platform'],
  // tools available for the developer's community
  tools: [{
    toolId: 'Stackoverflow',
    toolName: 'Stackoverflow- A Tool for all needs of a Developer',
    avatar: 'https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png?v=9c558ec15d8a',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'theteacherscorner.net',
    toolName: 'The Teacher\'s Corner',
    avatar: 'https://voxy.com/wp-content/uploads/2016/05/Teachers-Corner-Header-Image-1.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'comment', 'share', 'invitation'],
    activityEvents: ['like', 'remove'],
  }, {
    toolId: 'Github',
    toolName: 'Github- A World of Repositories',
    avatar: 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'upload'],
    activityEvents: ['newannouncement', 'like'],
  }],
  // role actions for the developer's community
  roleActions: [{
    role: 'moderator',
    toolsActions: [{
      toolId: 'Stackoverflow',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'owner',
    toolsActions: [{
      toolId: 'Github',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'Stackoverflow',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'admin',
    toolsActions: [{
      toolId: 'Stackoverflow',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'Github',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'member',
    toolsActions: [{
      toolId: 'Stackoverflow',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'Github',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }],
}, { /* template for the professor -- teacher's community*/
  name: 'Professor',
  purpose: 'Teaching',
  image: 'https://www.google.co.in/imgres?imgurl=http%3A%2F%2F4.bp.blogspot.com%2F-QmcH6K464U8%2FU5mzUCQoc0I%2FAAAAAAAACis%2Fhu2U9cwyUoE%2Fs1600%2Fbenefits-teachers-large.png&imgrefurl=https%3A%2F%2Fwww.emaze.com%2F%40AWRLLIF%2FEnglish-2&docid=UZsQGNXxkMMFsM&tbnid=_1ekzNBM6u1gOM%3A&vet=10ahUKEwiP3buQ7orVAhXBPY8KHQKQByEQMwjQASgOMA4..i&w=400&h=292&bih=810&biw=1535&q=teachers%20png&ved=0ahUKEwiP3buQ7orVAhXBPY8KHQKQByEQMwjQASgOMA4&iact=mrc&uact=8',
  description: 'This template will provides you the required tools and roles to create a teachers community',
  tags: ['books', 'board', 'school'],
  // tools available for the teacher's community
  tools: [{
    toolId: 'theteacherscorner.net',
    toolName: 'The Teacher\'s Corner',
    avatar: 'https://voxy.com/wp-content/uploads/2016/05/Teachers-Corner-Header-Image-1.jpg',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'scholastic.com',
    toolName: 'Scholastic- A World of Learners',
    avatar: 'http://www.bookbusinessmag.com/wp-content/uploads/sites/4/2015/08/1.jpg?x19104',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'forum',
    toolName: 'Forum',
    avatar: 'http://www.tudiabetes.org/forum/uploads/default/original/3X/3/5/35d47232d1d9cb26dcd2a226952f98137a9080c8.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['newannouncement', 'remove'],
  }],
  // role actions for the professor community
  roleActions: [{
    role: 'member',
    toolsActions: [{
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'scholastic.com',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'owner',
    toolsActions: [{
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'scholastic.com',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'moderator',
    toolsActions: [{
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'scholastic.com',
      actions: { bookmark: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'admin',
    toolsActions: [{
      toolId: 'forum',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'theteacherscorner.net',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }],
}, { /* template for the artist -- arts community*/
  name: 'Artist',
  purpose: 'Arts',
  image: 'https://www.google.co.in/imgres?imgurl=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fart-icon--hobbies-iconset--hadezign-7.png&imgrefurl=http%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fart-icon&docid=eHX19Q8psRIyuM&tbnid=bLudEA9IDBLz8M%3A&vet=10ahUKEwjZ7uPr7orVAhUHto8KHYPkAREQMwj_ASgBMAE..i&w=256&h=256&bih=810&biw=1535&q=arts%20png&ved=0ahUKEwjZ7uPr7orVAhUHto8KHYPkAREQMwj_ASgBMAE&iact=mrc&uact=8',
  description: 'This template will provides you the required tools and roles to create arts community',
  tags: ['sketches', 'paper', 'paint'],
  // tools available for the artist's community
  tools: [{
    toolId: 'theabundantartist.com',
    toolName: 'The Abundant Artist- A Place for Artists',
    avatar: 'http://theabundantartist.com/wp-content/uploads/2016/04/cropped-taa-logo.png',
    actions: ['postmessage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'www.creativebloq.com',
    toolName: 'Creative Bloq- Art & design Inspiration',
    avatar: 'http://kirileonard.com/wp-content/uploads/2015/06/creative_bloq_logo.png',
    actions: ['postmessage', 'read', 'Likemessage', 'edit', 'share', 'upload'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'calender',
    toolName: 'Calendar- All your ToDo Lists, Managed',
    avatar:'http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/calendar-icon.png',
    actions: ['reminder', 'to-do-list', 'holidays', 'birthday'],
    activityEvents: ['remainder', 'checklist'],
  }],
  // role actions for the artist community
  roleActions: [{
    role: 'owner',
    toolsActions: [{
      toolId: 'theabundantartist.com',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'calender',
      actions: { bookmark: 'self', add_event: 'self' },
    }, {
      toolId: 'www.creativebloq.com',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'admin',
    toolsActions: [{
      toolId: 'calender',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'www.creativebloq.com',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'moderator',
    toolsActions: [{
      toolId: 'calender',
      actions: { bookmark: 'self', add_event: 'self' },
    }, {
      toolId: 'www.creativebloq.com',
      actions: { edit: 'self', post: 'post_self' },
    }],
  }, {
    role: 'member',
    toolsActions: [{
      toolId: 'www.creativebloq.com',
      actions: { edit: 'self', post: 'post_self' },
    }, {
      toolId: 'calender',
      actions: { bookmark: 'self', add_event: 'self' },
    }],
  }],
}];
