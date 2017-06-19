module.exports = [{
  templateName: 'surgeon',
  purpose: 'medical',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tag: ['medcare', 'doctor'],
  tools: [{
    toolId: 'forum',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['like', 'remove'],
  }],
  role_actions: [{
    role: 'admin',
    toolId: 'forum',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
    ],
  }, {
    role: 'moderator',
    toolId: 'WeMedUp',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' },
    ],
  }],
}, {
  templateName: 'specialists',
  purpose: 'medical',
  description: 'This template will provides you the required tools and roles to create a medical community',
  tag: ['medcare', 'doctor', 'therapy'],
  tools: [{
    toolId: 'forum',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'WeMedUp',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'sermo',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['like', 'remove'],
  }],
  role_actions: [{
    role: 'admin',
    toolId: 'sermo',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
    ],
  }, {
    role: 'moderator',
    toolId: 'WeMedUp',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' },
    ],
  }],
}, {
  templateName: 'developer',
  purpose: 'technical',
  description: 'This template will provides you the required tools and roles to create a technical community',
  tags: ['IDE', 'platform'],
  tools: [{
    toolId: 'Stackoverflow',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
    activityEvents: ['newannouncement', 'remove'],
  }, {
    toolId: 'Quora',
    actions: ['postmesage', 'read', 'Likemessage', 'comment', 'share', 'invitation'],
    activityEvents: ['like','remove'],
  }, {
    toolId: 'Github',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'upload'],
    activityEvents: ['newannouncement', 'like'],
  }],
  role_actions: [{
    role: 'admin',
    toolId: 'Stackoverflow',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
      { action: 'delete_post', grant: 'self' },
    ],
  }, {
    role: 'member',
    toolId: 'Quora',
    actions: [{ action: 'like', grant: 'self' },
      { action: 'post', grant: 'self' },
    ],
  }],
}, {
  templateName: 'professor',
  purpose: 'Teaching',
  description: 'This template will provides you the required tools and roles to create a teachers community',
  tags: ['books', 'board', 'school'],
  tools: [{
    toolId: 'theteacherscorner.net',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'scholastic.com',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
    activityEvents: ['newannouncement', 'remove'],
  }],
  role_actions: [{
    role: 'member',
    toolId: 'scholastic.com',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
    ],
  }, {
    role: 'moderator',
    toolId: 'theteacherscorner.net',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' },
    ],
  }],
}, {
  purpose: 'arts',
  description: 'This template will provides you the required tools and roles to create arts community',
  tags: ['sketches', 'paper', 'paint'],
  tools: [{
    toolId: 'theabundantartist.com',
    actions: ['postmesage', 'read', 'Likemessage'],
    activityEvents: ['newannouncement', 'like', 'remove'],
  }, {
    toolId: 'www.creativebloq.com',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share', 'upload'],
    activityEvents: ['newannouncement', 'remove'],
  }],
  role_actions: [{
    role: 'admin',
    toolId: 'theabundantartist.com',
    actions: [{ action: 'post', grant: 'post_self' },
      { action: 'read', grant: 'self' },
    ],
  }, {
    role: 'editor',
    toolId: 'www.creativebloq.com',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
    ],
  }],
}];
