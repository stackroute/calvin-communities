module.exports = [{
  purpose: 'medical',
  description: 'This template will provides you the required tools and roles to create a surgeon community',
  tools: [{
    toolId: 'forum',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
  }, {
    toolId: 'WeMedUp',
    actions: ['postmesage', 'read', 'Likemessage'],
  }, {
    toolId: 'sermo',
    actions: ['postmesage', 'read', 'Likemessage', 'edit']
  }],
  role_actions: [{
    role: 'admin',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' }
    ]
  }, {
    role: 'moderator',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' }
    ]
  }]
}, {
  purpose: 'technical',
  description: 'This template will provides you the required tools and roles to create a Developer community',
  tools: [{
    toolId: 'Stackoverflow',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
  }, {
    toolId: 'Quora',
    actions: ['postmesage', 'read', 'Likemessage', 'comment', 'share', 'invitation'],
  }, {
    toolId: 'Github',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'upload'],
  }],
  role_actions: [{
    role: 'admin',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' },
      { action: 'delete_post', grant: 'self' }
    ]
  }, {
    role: 'member',
    actions: [{ action: 'like', grant: 'self' },
      { action: 'post', grant: 'self' }
    ]
  }]
}, {
  purpose: 'Teaching',
  description: 'This template will provides you the required tools and roles to create a teachers community',
  tools: [{
    toolId: 'theteacherscorner.net',
    actions: ['postmesage', 'read', 'Likemessage'],
  }, {
    toolId: 'scholastic.com',
    actions: ['postmesage', 'read', 'Likemessage', 'edit'],
  }],
  role_actions: [{
    role: 'member',
    actions: [{ action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' }
    ]
  }, {
    role: 'moderator',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' }
    ]
  }]
}, {
  purpose: 'Arts',
  description: 'This template will provides you the required tools and roles to create a artist\'s community',
  tools: [{
    toolId: 'theabundantartist.com',
    actions: ['postmesage', 'read', 'Likemessage'],
  }, {
    toolId: 'www.creativebloq.com',
    actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share', 'upload'],
  }],
  role_actions: [{
    role: 'admin',
    actions: [{ action: 'post', grant: 'post_self' },
      { action: 'read', grant: 'self' }
    ]
  }, {
    role: 'editor',
    actions: [{ action: 'edit', grant: 'self' },
      { action: 'post', grant: 'self' },
      { action: 'read', grant: 'self' }
    ]
  }]
}];
