import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import product from './product'
import banner from './banner'
import phone from './phone'
import audio from './audio'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ product, banner, phone, audio]),
})
