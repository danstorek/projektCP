import { QueryResolvers, MutationResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'

//START

//KONEC

const userProfile = {
  id: "1",
  name: 'John Smith',
  status: 'cached',
}

const MainKanal = {
  id: "1",
  nazev: "Example",
  popis: 'Example popis',
  odbery: 15649,
  img: 'https://blog.cdn.own3d.tv/resize=fit:crop,height:400,width:600/MNbwzXeFR4urkEHqa73A',
  url: 'https://www.google.com/'
}

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return userProfile
  },
  zobrazKanal(_parent, _args, _context, _info) {
    return MainKanal
  },
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args, _context, _info) {
    console.log(`setting a new name to ${_args.name}`)
    userProfile.name = _args.name
    return userProfile
  },
}

export default { Query, Mutation}
