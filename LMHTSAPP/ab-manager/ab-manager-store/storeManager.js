import FIRST from '../../src/modules/first/index.js'
import KNOWLEDGEBASE from '../../src/modules/knowledge-base/index.js'

export default{ 
 init (store) {
    store.registerModule(FIRST.name, FIRST);
    store.registerModule(KNOWLEDGEBASE.name, KNOWLEDGEBASE);
  }
}