module.exports = [{
  /* template for the surgeon -- medical community*/
  name: 'Surgeon',
  purpose: 'Medical',
  image: 'http://www.theportlandhospital.com/uploads/data/files/Pioneering%20Surgery.jpg',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tags: ['medcare', 'doctor'],
  // tools available for the surgeon medical community
  tools: [{
    toolId: 'forum',
    toolName: 'Forum',
    purpose: 'Discussions',
    avatar: 'http://www.tudiabetes.org/forum/uploads/default/original/3X/3/5/35d47232d1d9cb26dcd2a226952f98137a9080c8.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    toolName: 'WeMedUp- A Medical Tool',
    purpose: 'Medical',
    avatar: 'http://www.wemedup.com/img/logo.png',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    toolName: 'Sermo- A Tool for Surgeons',
    purpose: 'Medical',
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
  image: 'http://www.pamf.org/findadoctor/feature-locations.jpg',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tags: ['medcare', 'doctor', 'therapy'],
  // tools available for the specialists medical community
  tools: [{
    toolId: 'forum',
    toolName: 'Forum',
    purpose: 'Discussions',
    avatar: 'http://www.tudiabetes.org/forum/uploads/default/original/3X/3/5/35d47232d1d9cb26dcd2a226952f98137a9080c8.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    toolName: 'WeMedUp- A Medical Tool',
    purpose: 'Medical',
    avatar: 'http://www.wemedup.com/img/logo.png',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    toolName: 'Sermo- A Tool for Surgeons',
    purpose: 'Medical',
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
  image: 'https://andela.com/wp-content/uploads/2016/04/151209HR005.jpg',
  description: 'This template will provides you the required tools and roles to create a technical community',
  tags: ['IDE', 'platform'],
  // tools available for the developer's community
  tools: [{
    toolId: 'Stackoverflow',
    toolName: 'Stackoverflow- A Tool for all needs of a Developer',
    purpose: 'IT',
    avatar: 'https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png?v=9c558ec15d8a',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'theteacherscorner.net',
    toolName: 'The Teacher\'s Corner',
    purpose: 'Teaching',
    avatar: 'https://voxy.com/wp-content/uploads/2016/05/Teachers-Corner-Header-Image-1.jpg',
    actions: ['postmesage', 'read', 'Likemessage', 'comment', 'share', 'invitation'],
    activityEvents: ['like', 'remove'],
  }, {
    toolId: 'Github',
    toolName: 'Github- A World of Repositories',
    purpose: 'IT',
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
  image: 'https://cdn2.certificationmap.com/content/cdb9ec0fd3a04753855c0d58d63824aa/master-of-arts-in-teaching.jpg',
  description: 'This template will provides you the required tools and roles to create a teachers community',
  tags: ['books', 'board', 'school'],
  // tools available for the teacher's community
  tools: [{
    toolId: 'theteacherscorner.net',
    toolName: 'The Teacher\'s Corner',
    purpose: 'Teaching',
    avatar: 'https://voxy.com/wp-content/uploads/2016/05/Teachers-Corner-Header-Image-1.jpg',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'scholastic.com',
    toolName: 'Scholastic- A World of Learners',
    purpose: 'Teaching',
    avatar: 'http://www.bookbusinessmag.com/wp-content/uploads/sites/4/2015/08/1.jpg?x19104',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'forum',
    toolName: 'Forum',
    purpose: 'Discussions',
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
  image: 'http://i.dailymail.co.uk/i/pix/2012/01/26/article-0-1177A45E000005DC-437_634x405.jpg',
  description: 'This template will provides you the required tools and roles to create arts community',
  tags: ['sketches', 'paper', 'paint'],
  // tools available for the artist's community
  tools: [{
    toolId: 'theabundantartist.com',
    toolName: 'The Abundant Artist- A Place for Artists',
    purpose: 'Art',
    avatar: 'http://theabundantartist.com/wp-content/uploads/2016/04/cropped-taa-logo.png',
    actions: ['postmessage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'www.creativebloq.com',
    toolName: 'Creative Bloq- Art & design Inspiration',
    purpose: 'Art',
    avatar: 'http://kirileonard.com/wp-content/uploads/2015/06/creative_bloq_logo.png',
    actions: ['postmessage', 'read', 'Likemessage', 'edit', 'share', 'upload'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'calender',
    toolName: 'Calendar- All your ToDo Lists, Managed',
    purpose: 'Schedules',
    avatar: 'http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/calendar-icon.png',
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
