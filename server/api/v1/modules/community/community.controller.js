const communityServ = require('./community.service');

/**
 * Get For all communities, 
 * 
 * GET REQUEST
 *
 *
 */
function getallcommunities(done) {
    communityServ.getallcommunities(done);
}


/**
 * POST For specific communities, 
 * POST REQUEST
 *
 *
 */
function addcommunity(community, done) {
    if (
        community.domain === undefined ||
        community.name === undefined ||
        community.owner === undefined ||
        community.template === undefined ||
        community.tags === undefined ||
        community.status === undefined ||
        !community.domain ||
        !community.name ||
        !community.owner ||
        !community.template ||
        !community.tags ||
        community.tags.length === 0 ||
        community.status !== ('Active' || 'Inactive')
    ) done('Wrong Data Inputs', undefined);

    const param = [community.domain, community.name,
        community.status, community.template, community.tags,
        community.createdby, community.description,
        community.avatar, community.poster, community.roles,
        community.createdby, community.createdby
    ];
    communityServ.addcommunity(param, done);

}


/**
 * Get For specific communities, 
 * GET REQUEST
 *
 */
function getcommunity(domainName, done) {
    communityServ.getcommunity(domainName, done);

}

/**
 * PATCH For specific communities, 
 * PATCH REQUEST
 *
 */
function updatecommunity(domainName, community, done) {
    if (
        community.tags === undefined ||
        community.tags.length === 0 ||
        community.status !== ('Active' || 'Inactive') ||
        community.updatedby === undefined ||
        !community.updatedby
    ) done('Wrong Data Inputs', undefined); ;

    const param = [community.name, community.description, community.status,
        community.tags, community.updatedby, domainName
    ];
    communityServ.updatecommunity(param, done);
}


module.exports = {
    getallcommunities,
    addcommunity,
    getcommunity,
    updatecommunity,

};
