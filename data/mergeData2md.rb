require 'json'

def getKeyValuePair(key, value)

    return key + ': ' + toStringIfNumeric(value)
end

def toStringIfNumeric(value)

    if value.is_a? Numeric
	    return value.to_s

	elsif !!value == value
	    return value.to_s
	else
		return '"' + value.gsub('"', '&quote;') + '"'
	end
end

def getEnumerableKeyValue(key, value, index, getObjectValueOnly)

    mdListIndent = '    '
    if index === 0 || getObjectValueOnly
        mdListIndent = '  - '
    end

    if getObjectValueOnly
        return mdListIndent + toStringIfNumeric(value)
    else
        return mdListIndent + getKeyValuePair(key, value)
    end
end

def changeEnumerableImportedKeyName(key)

	# Import keywords as tags
	if key === 'keywords'
        return 'tags'

    # Import genres as categories
	elsif key === 'genres'
	    return 'categories'

	else return key

	end
end


file = File.read('originalData.json')

data_hash = JSON.parse(file)

data_hash.each do |game|
	File.open("mdOutput/" + game['name'] + ".md", 'w') do |file|
		file.puts('---')
		file.puts('view: game')
		file.puts('layout: game')
		file.puts('author: reicast')
		file.puts('created_at: 2018-03-25 09:00')
		file.puts('updated_at: 2019-05-02 09:00')
		file.puts('id: ' + game['name'])
		file.puts('title: "' + game['title'] + '"')
		file.puts('gamedb-issue: 0')
		file.puts('')
		file.puts('releases:')
		known = []
		game['discs'].each do |disc|
			id = disc['fingerprint'].split(' ')[0]
			if not known.include?(id)
				known.push(id)
		file.puts('  - id: "' + disc['fingerprint'].split(' ')[0] + '"')
		file.puts('    region: ' + disc['region'].upcase())
		file.puts('    version: "' + disc['version'] + '"')
		file.puts('    discs: ' + disc['seq_count'])
		file.puts('    medium: gdrom')
			end
		end

		file.puts('')
		file.puts('test-videos:')
		game['discs'].each do |disc|
			video = disc['video']
		file.puts('  - fingerprint: "' + disc['fingerprint'] + ' ' + disc['region'].upcase() + '"')
		file.puts('    title: Intro auto run')
		file.puts('    hw: i7 2720qm, GeForce 540M')
		file.puts('    yt: ' + video['youtube_id'])
		file.puts('    git: ' + video['build'].split('-')[0])
		file.puts('    platform: win86-release')
		end

	    file.puts('')
        filepath = "igdbData/" + game['name'] + ".json"
        falsy = false
        if File.file?(filepath)
		    game_db_file = File.read(filepath)
		    game_db = JSON.parse(game_db_file)
		    # Check if file for game exists
	        if defined?game_db
	            # There is only but one array item - the game object
	            game_db.each do |game_data|
	            file.puts('gotIGDBGame: 1')
	                # Iterate thru object attributes
	                game_data.each do |attr_key, attr_value|
	                    # Check if attribute value is an array or object
	                    if attr_value.is_a? Enumerable
	                    getObjectValueOnly = false
	                    # These consist of objects with id and name key/value pairs.
	                    # We only want to keep a simple array of the name values
	                    objectsToGetOnlyValues = ['genres', 'game_modes', 'keywords', 'player_perspectives' ]
	                    # Import keywords as tags, etc
	                    file.puts(changeEnumerableImportedKeyName(attr_key) + ':')
	                    if objectsToGetOnlyValues.include? attr_key
	                        getObjectValueOnly = true
	                    end
	                    index = 0
	                        attr_value.each do |obj_key, obj_value|
	                             # We have an array
	                            if obj_key.is_a? Enumerable
	                             # Luckily, our data is not nested any deeper (still best
	                             # TODO a recurring traversal iteration function with this + above instead)
	                             index = 0
	                                obj_key.each do |last_key, last_value|
	                                    if getObjectValueOnly and last_key === 'id'

                                        else
	                                    file.puts(getEnumerableKeyValue(last_key, last_value, index, getObjectValueOnly))
	                                    index += 1
	                                    end
	                                end
                                # We have an object
	                            else
	                            file.puts(getEnumerableKeyValue(obj_key, obj_value, index, getObjectValueOnly))
	                            end
                            index += 1
                            end
	                    else
	                         # Attributes not enumerable - replace key 'id' to 'idIGDB'
	                         if attr_key === 'id'
	                            attr_key = 'idIGDB'
	                         end
	                        file.puts(getKeyValuePair(attr_key, attr_value))
	                    end
	                 end
	            end
		    end
		else
		    file.puts('gotIGDBGame: 0')
		end
        file.puts('')
		file.puts('---')
	end
end
