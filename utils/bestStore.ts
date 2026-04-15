import { users, user } from "../data/demoUser"
import { stores }  from "../data/demoStores"
import Location from "expo-location"

// get needed info
// get user coords
// get user budget
// get search radius
// get user list
// get vector to store the store, dist, and prices of the stores

// iterate through stores nearby and get their distance from the user
// for store in stores 
//      dist = sqrt(pow(user_x - store_x, 2) + pow(user_x - store_x, 2))
//      if dist > radius exit
//      vector.push({ store, dist })

// for store in dist
//  totalCost = 0;
//      for item in list
//          if !item.inStock:
//              out
//          totalCost += store.item.price()
//  stores.push(totalCost)

// return min(prices)